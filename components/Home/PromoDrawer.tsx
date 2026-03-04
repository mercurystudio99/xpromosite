"use client"

import type React from "react"

import { useState } from "react"
import { X, Mail, CheckCircle2, TrendingUp, Shield, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PromoDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function PromoDrawer({ isOpen, onClose }: PromoDrawerProps) {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    // Handle form submission logic here
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-gray-600 transition-colors hover:bg-white hover:text-gray-900"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Left side - Image section */}
          <div className="relative hidden bg-[#0052CC] md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0052CC] to-[#003D99]" />
            <div className="relative flex h-full items-center justify-center p-12">
              <img
                src="/professional-woman-with-promotional-products-backp.jpg"
                alt="Professional with promotional products"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Right side - Form section */}
          <div className="flex flex-col bg-white p-8 md:p-12">
            <div className="mb-8">
              <div className="mb-6 flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[#0052CC]" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">PromoHub</h3>
                  <p className="text-xs text-gray-500">est. 1999</p>
                </div>
              </div>

              <h1 className="mb-3 text-balance text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
                Your One-Stop Shop
              </h1>
              <p className="mb-6 text-pretty text-lg text-gray-700">for Curated Promotional Items & Gifts</p>

              <div className="mb-6 rounded-lg border-2 border-[#0052CC] bg-blue-50 p-4 text-center">
                <p className="text-balance text-lg font-semibold text-[#0052CC]">GET $75 OFF YOUR FIRST ORDER!</p>
              </div>

              <p className="mb-6 text-center text-sm text-gray-600">
                Sign up today and <span className="font-semibold text-gray-900">unlock $75 off</span> your first order
                of <span className="font-semibold text-gray-900">$500 or more</span>
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Enter Your Company Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 pl-10 text-base"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-12 w-full bg-[#0052CC] text-base font-semibold text-white hover:bg-[#003D99]"
                >
                  UNLOCK THE PROMO CODE
                </Button>
              </form>
            ) : (
              <div className="rounded-lg bg-green-50 p-6 text-center">
                <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-green-600" />
                <h3 className="mb-2 text-lg font-semibold text-green-900">Success! Check your email</h3>
                <p className="text-sm text-green-700">We've sent your promo code to {email}</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom trust indicators */}
        <div className="grid grid-cols-2 gap-4 bg-[#001F3F] px-8 py-6 text-white md:grid-cols-4 md:gap-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold leading-tight">Over 55,000</p>
              <p className="text-xs text-gray-300">Happy Clients</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold leading-tight">Guaranteed</p>
              <p className="text-xs text-gray-300">Satisfaction</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold leading-tight">65+ Million</p>
              <p className="text-xs text-gray-300">Items Shipped</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold leading-tight">INC 5000</p>
              <p className="text-xs text-gray-300">Fastest Growing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}