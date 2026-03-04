"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Bell, User, Lock, Globe, CreditCard, Settings as SettingsIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProfileImageUpload } from "@/components/ui/profile-image-upload";

interface ProfileData {
  name: string;
  email: string;
  image: string | null;
  role: string;
}

export default function SettingsPage() {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  
  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<boolean>(false);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/users/profile');
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        
        const data = await response.json();
        
        setProfileData(data);
        setProfileImage(data.image);
        setFormData({
          name: data.name || "",
        });
      } catch (err: any) {
        console.error('Error fetching profile:', err);
        setError(err.message || 'Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfileData();
  }, []);

  // Handle profile update
  const handleProfileUpdate = async () => {
    try {
      setSaveStatus("saving");
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
      setProfileData(updatedProfile);
      
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile');
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
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

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 max-w-6xl flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid grid-cols-6 gap-4 w-full max-w-4xl">
          {/* <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" /> General
          </TabsTrigger> */}
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" /> Security
          </TabsTrigger>
          {/* <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger> */}
          {/* <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" /> Billing
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Globe className="h-4 w-4" /> Appearance
          </TabsTrigger> */}
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure general settings for your account and dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" placeholder="My Site" defaultValue="XPromo Admin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea id="site-description" placeholder="Enter a description of your site"
                  defaultValue="XPromo administration dashboard for managing products, orders and settings" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                    <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                    <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                    <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Default Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="maintenance-mode" />
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>
                {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved" : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Manage your profile information and public details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-4">
                <ProfileImageUpload 
                  profileImage={profileImage}
                  onUpload={(url) => setProfileImage(url)}
                  className="mb-4"
                />
                <div className="flex-1 space-y-4 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full name</Label>
                      <Input 
                        id="name" 
                        name="name"
                        placeholder="Full name" 
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Email address" 
                        value={profileData?.email || ""}
                        disabled
                        className="bg-gray-100"
                      />
                      <p className="text-xs text-muted-foreground">
                        Email cannot be changed. Contact support if needed.
                      </p>
                    </div>
                  </div>
                  {profileData?.role === "admin" && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <span className="font-semibold">Account type: {profileData.role.toUpperCase()}</span>. 
                        You have full administrative access.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button 
                onClick={handleProfileUpdate}
                disabled={saveStatus === "saving"}
              >
                {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved" : "Update Profile"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
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

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications and alerts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order updates</p>
                    <p className="text-sm text-muted-foreground">Receive notifications about order status changes</p>
                  </div>
                  <Switch id="order-updates" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Product updates</p>
                    <p className="text-sm text-muted-foreground">Receive notifications about product changes</p>
                  </div>
                  <Switch id="product-updates" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Customer messages</p>
                    <p className="text-sm text-muted-foreground">Receive notifications about new customer messages</p>
                  </div>
                  <Switch id="customer-messages" defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Notifications</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Security alerts</p>
                    <p className="text-sm text-muted-foreground">Receive notifications about security issues</p>
                  </div>
                  <Switch id="security-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System updates</p>
                    <p className="text-sm text-muted-foreground">Receive notifications about system updates</p>
                  </div>
                  <Switch id="system-updates" defaultChecked />
                </div>
              </div>

              <Separator />

              <div>
                <Label htmlFor="email-frequency">Email Frequency</Label>
                <Select defaultValue="immediate">
                  <SelectTrigger id="email-frequency" className="mt-2">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="daily">Daily digest</SelectItem>
                    <SelectItem value="weekly">Weekly digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved" : "Update Preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Settings</CardTitle>
              <CardDescription>
                Manage your billing information and subscription.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Current Plan</h3>
                <div className="rounded-md border p-4 bg-blue-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Business Plan</p>
                      <p className="text-sm text-muted-foreground mt-1">$49.99 per month, billed monthly</p>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 text-xs rounded-full">Active</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">Change Plan</Button>
                  <Button variant="destructive" size="sm">Cancel Subscription</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Method</h3>
                <div className="rounded-md border p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-16 bg-gray-200 rounded flex items-center justify-center text-xs">VISA</div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/2027</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
                <Button variant="outline">Add Payment Method</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Billing History</h3>
                <div className="rounded-md border">
                  <div className="py-3 px-4 border-b flex justify-between items-center">
                    <div>
                      <p className="font-medium">Apr 1, 2025</p>
                      <p className="text-sm text-muted-foreground">Invoice #XP-2025-8732</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-medium">$49.99</p>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                  <div className="py-3 px-4 border-b flex justify-between items-center">
                    <div>
                      <p className="font-medium">Mar 1, 2025</p>
                      <p className="text-sm text-muted-foreground">Invoice #XP-2025-7654</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-medium">$49.99</p>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                  <div className="py-3 px-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Feb 1, 2025</p>
                      <p className="text-sm text-muted-foreground">Invoice #XP-2025-6543</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-medium">$49.99</p>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                </div>
                <Button variant="link" className="p-0">View all invoices</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-md p-4 cursor-pointer flex flex-col items-center space-y-2 bg-white">
                    <div className="h-20 w-full rounded bg-white border"></div>
                    <p className="text-sm font-medium">Light Theme</p>
                  </div>
                  <div className="border rounded-md p-4 cursor-pointer flex flex-col items-center space-y-2 bg-gray-950">
                    <div className="h-20 w-full rounded bg-gray-900 border border-gray-800"></div>
                    <p className="text-sm font-medium text-white">Dark Theme</p>
                  </div>
                  <div className="border rounded-md p-4 cursor-pointer flex flex-col items-center space-y-2">
                    <div className="h-20 w-full rounded bg-gradient-to-b from-white to-gray-900"></div>
                    <p className="text-sm font-medium">System Default</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Dashboard Layout</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-md p-4 cursor-pointer flex flex-col items-center space-y-2">
                    <div className="h-20 w-full rounded flex">
                      <div className="w-1/4 bg-gray-200 h-full"></div>
                      <div className="w-3/4 bg-gray-100 h-full"></div>
                    </div>
                    <p className="text-sm font-medium">Sidebar Navigation</p>
                  </div>
                  <div className="border rounded-md p-4 cursor-pointer flex flex-col items-center space-y-2">
                    <div className="h-20 w-full rounded flex flex-col">
                      <div className="h-1/4 bg-gray-200 w-full"></div>
                      <div className="h-3/4 bg-gray-100 w-full"></div>
                    </div>
                    <p className="text-sm font-medium">Top Navigation</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Accent Color</h3>
                <div className="grid grid-cols-6 gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-500 cursor-pointer border-2 border-blue-500"></div>
                  <div className="h-8 w-8 rounded-full bg-purple-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-green-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-red-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-orange-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-pink-500 cursor-pointer"></div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="animations" defaultChecked />
                <Label htmlFor="animations">Enable animations</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved" : "Save Appearance"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {saveStatus === "saved" && (
        <Alert className="mt-4 bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-600">Success</AlertTitle>
          <AlertDescription className="text-green-600">
            Your settings have been saved successfully.
          </AlertDescription>
        </Alert>
      )}
      
      {saveStatus === "error" && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || "An error occurred while saving your settings."}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}