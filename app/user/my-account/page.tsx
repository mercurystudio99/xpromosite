"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Shadcn Components
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


// Icons
import {
    User,
    Mail,
    Phone,
    Bell,
    Save,
    Edit,
    AlertCircle,
    Package,
    Heart,
    Loader2
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { ProfileImageUpload } from '@/components/ui/profile-image-upload';

interface UserProfile {
    _id: string;
    name: string;
    email: string;
    image: string | null;
    phone?: string;
    preferences?: {
        marketing: boolean;
        orderUpdates: boolean;
        promotions: boolean;
        newsletter: boolean;
    };
}

export default function MyAccountPage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: ""
    });
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

    // Password change state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordSuccess, setPasswordSuccess] = useState<boolean>(false);

    const { data: session, status } = useSession();
    const router = useRouter();

    // Fetch user profile data
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('/api/users/profile');

                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }

                const data = await response.json();

                setUser(data);
                setProfileImage(data.image);
                setFormData({
                    name: data.name || "",
                    phone: data.phone || ""
                });

                // Initialize preferences if they don't exist
                if (!data.preferences) {
                    data.preferences = {
                        marketing: true,
                        orderUpdates: true,
                        promotions: false,
                        newsletter: false
                    };
                }
            } catch (err: any) {
                console.error('Error fetching profile:', err);
                setError(err.message || 'Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        if (status === "authenticated") {
            fetchUserProfile();
        }
    }, [status]);

    // Handle profile update
    const handleProfileUpdate = async () => {
        try {
            setError(null);

            const updateData = {
                name: formData.name,
                image: profileImage
            };

            const response = await fetch('/api/users/profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update profile');
            }

            const updatedProfile = await response.json();

            // Update the local state with new profile data
            setUser(updatedProfile);
            setIsEditing(false);
            toast.success("Profile updated successfully!");
        } catch (err: any) {
            console.error('Error updating profile:', err);
            setError(err.message || 'Failed to update profile');
            toast.error("Failed to update profile: " + err.message);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    // Handle password change
    const handlePasswordChange = async () => {
        try {
            // Reset states
            setPasswordError(null);
            setPasswordSuccess(false);

            // Validate passwords
            if (!currentPassword || !newPassword || !confirmPassword) {
                setPasswordError("All password fields are required");
                return;
            }

            if (newPassword !== confirmPassword) {
                setPasswordError("New passwords do not match");
                return;
            }

            if (newPassword.length < 8) {
                setPasswordError("New password must be at least 8 characters");
                return;
            }

            setSaveStatus("saving");

            const response = await fetch('/api/users/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to change password');
            }

            // Clear password fields
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            setPasswordSuccess(true);
            setSaveStatus("saved");
            setTimeout(() => setSaveStatus("idle"), 2000);
        } catch (err: any) {
            console.error('Error changing password:', err);
            setPasswordError(err.message || 'Failed to change password');
            setSaveStatus("error");
            setTimeout(() => setSaveStatus("idle"), 3000);
        }
    };
    const handlePreferenceChange = async (key: string, value: boolean) => {
        if (!user) return;

        try {
            const updatedPreferences = {
                marketing: user.preferences?.marketing ?? false,
                orderUpdates: user.preferences?.orderUpdates ?? true,
                promotions: user.preferences?.promotions ?? false,
                newsletter: user.preferences?.newsletter ?? false,
                [key]: value
            };

            // For now, we'll just update the local state since the API endpoint
            // for updating preferences isn't implemented yet
            setUser({
                ...user,
                preferences: updatedPreferences
            });

            toast.success(`Preference updated: ${key}`);

            // Here you would typically make an API call to update preferences
            // const response = await fetch('/api/users/preferences', {
            //     method: 'PATCH',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ preferences: updatedPreferences }),
            // });
        } catch (err: any) {
            console.error('Error updating preference:', err);
            toast.error("Failed to update preference");
        }
    };

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/auth/signin");
        }
    }, [status, router]);

    if (status === "loading" || loading) {
        return (
            <div className="flex flex-col min-h-screen">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-newprimary"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container max-w-6xl mx-auto py-8 px-4 md:px-6">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error}. Please try refreshing the page.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    if (!session || !user) {
        return null;
    }

    return (
        <div className="container max-w-6xl mx-auto py-8 px-4 md:px-6">
            <div className="flex flex-col space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage your account settings and preferences
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex space-x-2">
                        <Button variant="outline" onClick={() => router.push('/user/my-orders')}>
                            <Package className="mr-2 h-4 w-4" />
                            My Orders
                        </Button>

                    </div>
                </div>

                <div className="grid gap-8 grid-cols-1">
                    <Tabs defaultValue="profile">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="profile">
                                <User className="h-4 w-4 mr-2" />
                                Profile
                            </TabsTrigger>
                            <TabsTrigger value="security">
                                <Bell className="h-4 w-4 mr-2" />
                                Security
                            </TabsTrigger>
                        </TabsList>

                        {/* Profile Tab */}
                        <TabsContent value="profile" className="mt-6 space-y-4">
                            <Card>
                                <CardHeader>
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <CardTitle>Profile Information</CardTitle>
                                            <CardDescription>
                                                Update your personal details and profile image
                                            </CardDescription>
                                        </div>
                                        {!isEditing && (
                                            <Button variant="outline" onClick={() => setIsEditing(true)}>
                                                <Edit className="h-4 w-4 mr-2" />
                                                Edit Profile
                                            </Button>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="flex flex-col items-center space-y-4">
                                            {isEditing ? (
                                                // <CloudinaryUpload
                                                //     onUpload={(url) => setProfileImage(url)}
                                                //     previewUrl={profileImage || undefined}
                                                //     className="w-32 h-32"
                                                //     folder="xpromo/profiles"
                                                // />
                                                <ProfileImageUpload
                                                    profileImage={profileImage}
                                                    onUpload={(url) => setProfileImage(url)}
                                                    className="mb-4"
                                                />
                                            ) : (
                                                <Avatar className="w-32 h-32">
                                                    <AvatarImage src={profileImage || undefined} alt={user.name} />
                                                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            )}
                                            {!isEditing && (
                                                <div className="text-center">
                                                    <h3 className="font-medium">{user.name}</h3>
                                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 space-y-4">
                                            {isEditing ? (
                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="name">Full Name</Label>
                                                            <Input
                                                                id="name"
                                                                name="name"
                                                                value={formData.name}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="email">Email</Label>
                                                            <Input
                                                                id="email"
                                                                name="email"
                                                                type="email"
                                                                value={user.email}
                                                                disabled
                                                                className="bg-gray-100"
                                                            />
                                                            <p className="text-xs text-muted-foreground">
                                                                Email cannot be changed. Contact support if needed.
                                                            </p>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="phone">Phone</Label>
                                                            <Input
                                                                id="phone"
                                                                name="phone"
                                                                value={formData.phone}
                                                                onChange={handleInputChange}
                                                                placeholder="Add your phone number"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <Label className="text-muted-foreground">Full Name</Label>
                                                            <p>{user.name}</p>
                                                        </div>
                                                        <div>
                                                            <Label className="text-muted-foreground">Email</Label>
                                                            <div className="flex items-center">
                                                                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                                                                <p>{user.email}</p>
                                                            </div>
                                                        </div>
                                                        {user.phone && (
                                                            <div>
                                                                <Label className="text-muted-foreground">Phone</Label>
                                                                <div className="flex items-center">
                                                                    <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                                                                    <p>{user.phone}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                                {isEditing && (
                                    <CardFooter className="flex justify-end space-x-2">
                                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={handleProfileUpdate}>
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Changes
                                        </Button>
                                    </CardFooter>
                                )}
                            </Card>


                        </TabsContent>


                        {/* Security Settings */}
                        <TabsContent value="security" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Security Settings</CardTitle>
                                    <CardDescription>
                                        Update your password and manage security settings.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Change Password</h3>
                                        {passwordError && (
                                            <Alert variant="destructive" className="mb-4">
                                                <AlertCircle className="h-4 w-4" />
                                                <AlertDescription>{passwordError}</AlertDescription>
                                            </Alert>
                                        )}
                                        {passwordSuccess && (
                                            <Alert className="mb-4 bg-green-50 border-green-200">
                                                <AlertCircle className="h-4 w-4 text-green-600" />
                                                <AlertDescription className="text-green-700">
                                                    Password updated successfully!
                                                </AlertDescription>
                                            </Alert>
                                        )}
                                        <div className="space-y-2">
                                            <Label htmlFor="current-password">Current Password</Label>
                                            <Input
                                                id="current-password"
                                                type="password"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-password">New Password</Label>
                                            <Input
                                                id="new-password"
                                                type="password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                                            <Input
                                                id="confirm-password"
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Two-factor authentication</p>
                                                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                                            </div>
                                            <Switch id="2fa" disabled />
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Coming soon! Two-factor authentication will be available in a future update.
                                        </p>
                                    </div>

                                    <Separator />

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Session Management</h3>
                                        <div className="rounded-md border p-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-medium">Current Session</p>
                                                    <p className="text-xs text-muted-foreground mt-1">Windows • Chrome • {new Date().toLocaleDateString()}</p>
                                                </div>
                                                <p className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        onClick={handlePasswordChange}
                                        className="ml-auto"
                                        disabled={saveStatus === "saving"}
                                    >
                                        {saveStatus === "saving" ? "Saving..." : "Update Password"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}