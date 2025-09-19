// src/components/Navbar.jsx
"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../app/context/AuthContext";
import { CartContext } from "@/app/context/CartContext";
import CartModal from "./CartModel";

export default function Navbar({ cartCount = 0, user1 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const {getCartCount } = useContext(CartContext)
   const [cartOpen, setCartOpen] = useState(false);
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              ShopMate
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              All Products
            </Link>
            <Link
              href="/favorite"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Favorite
            </Link>
          </div>

          {/* Right Side: Cart + Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-gray-700 hover:text-indigo-600"
            >
              <FontAwesomeIcon icon={faCartShopping} size={20} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1 text-xs">
                  {getCartCount()}
                </span>
              )}
            </button>
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* User Section */}
            {user ? (
              <div className="relative">
                <button
                  className="flex items-center text-gray-700 hover:text-indigo-600"
                  onClick={()=>setUserDropdown(!userDropdown)}
                >
                  <FontAwesomeIcon icon={faCircleUser} size={20} />
                  <span className="ml-1">{user.name}</span>
                </button>
                {/* Dropdown */}
                {userDropdown && (
                  <div className="absolute mt-2 w-40 bg-white shadow-lg rounded">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-indigo-100"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 hover:bg-indigo-100"
                    >
                      Orders
                    </Link>
                    <Link
                      onClick={logout}
                      href={""}
                      className="block px-4 py-2 hover:bg-indigo-100"
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-indigo-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-2 pt-2 pb-3 space-y-1 shadow-md">
          <Link
            href="/cart"
            className="block px-3 py-2 rounded text-gray-700 hover:bg-indigo-100"
          >
            Cart {getCartCount()}
          </Link>
          {user ? (
            <>
              <Link
                href="/profile"
                className="block px-3 py-2 rounded text-gray-700 hover:bg-indigo-100"
              >
                Profile
              </Link>
              <Link
                href="/orders"
                className="block px-3 py-2 rounded text-gray-700 hover:bg-indigo-100"
              >
                Orders
              </Link>
              <Link
                href="/logout"
                className="block px-3 py-2 rounded text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block px-3 py-2 rounded text-gray-700 hover:bg-indigo-100"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block px-3 py-2 rounded text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}

      {/* Cart Modal */}
      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
}
