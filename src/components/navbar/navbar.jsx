import { Link, NavLink } from "react-router-dom";
import {
  FiSun,
  FiMoon,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";

import { useTheme } from "../ThemeContext";
import { useWishlist } from "../../services/apiHooks/wishlistHook";
import { useProfile } from "../../services/apiHooks/authHook";
import { useCart } from "../../services/apiHooks/cartHooks";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  const { data: profileData } = useProfile();
  const { data: cartData } = useCart();
  const { data: wishlistData } = useWishlist();

  // =========================
  // User
  // =========================

  const user = profileData?.user ?? profileData ?? null;

  // =========================
  // Cart
  // =========================

  const cartItems =
    cartData?.items ??
    cartData?.cart?.items ??
    cartData?.products ??
    cartData?.cart?.products ??
    [];

  const cartCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity ?? 1),
    0,
  );

  // =========================
  // Wishlist
  // =========================

  const wishlistItems =
    wishlistData?.items ??
    wishlistData?.wishlist ??
    wishlistData?.products ??
    [];

  const wishlistCount = wishlistItems.length;

  // =========================
  // User name
  // =========================

  const userName =
    user?.username ??
    user?.name ??
    user?.firstName ??
    user?.fullName ??
    "Account";

  // =========================
  // Navigation
  // =========================

  const navLinkClass = ({ isActive }) =>
    `
      rounded-full px-5 py-2
      text-sm font-medium
      transition-all duration-200

      ${
        isActive
          ? "bg-accent text-white font-bold shadow-md shadow-accent/20"
          : "text-text-secondary hover:bg-accent-light hover:text-accent"
      }
    `;

  // =========================
  // Icon Button
  // =========================

  const iconButtonClass = `
    relative
    flex items-center justify-center
    rounded-full p-2
    text-text-secondary
    transition-all duration-200
    hover:bg-surface-elevated
    hover:text-accent
  `;

  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-border-subtle
        bg-surface-card/95
        text-text-primary
        shadow-sm
        backdrop-blur-md
        transition-colors duration-300
      "
    >
      <div
        className="
          mx-auto flex h-16 max-w-7xl
          items-center justify-between
          px-4 sm:px-6 lg:px-8
        "
      >
        {/* =========================
            Logo
        ========================= */}

        <div className="flex items-center gap-2">
          <Link to="/" className="group flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="70 185 365 130"
              role="img"
              width={"120px"}
              aria-labelledby="title desc"
              preserveAspectRatio="xMidYMid meet"
            >
              <title id="title">E-HUB Logo</title>
              <desc id="desc">
                Editable vector E-HUB logo using the project's light and dark
                color tokens.
              </desc>
              <g id="e-hub-logo" fillRule="evenodd">
                <path
                  id="logo-primary"
                  className="logo-primary"
                  d="M 384.00 288.00 L 382.00 287.00 L 382.00 290.00 L 381.00 291.00 L 373.00 287.00 L 370.00 287.00 L 368.00 289.00 L 360.00 289.00 L 358.00 291.00 L 357.00 297.00 L 363.00 304.00 L 359.00 297.00 L 359.00 295.00 L 361.00 292.00 L 368.00 292.00 L 369.00 293.00 L 374.00 292.00 L 376.00 294.00 L 384.00 295.00 Z M 252.00 252.00 L 252.00 286.00 L 256.00 295.00 L 261.00 300.00 L 271.00 305.00 L 273.00 305.00 L 270.00 303.00 L 270.00 301.00 L 274.00 292.00 L 276.00 292.00 L 279.00 294.00 L 303.00 294.00 L 306.00 292.00 L 311.00 292.00 L 322.00 288.00 L 332.00 287.00 L 335.00 285.00 L 342.00 283.00 L 346.00 281.00 L 348.00 278.00 L 354.00 276.00 L 358.00 277.00 L 359.00 275.00 L 365.00 275.00 L 366.00 274.00 L 368.00 275.00 L 379.00 275.00 L 380.00 276.00 L 384.00 276.00 L 385.00 275.00 L 382.00 273.00 L 377.00 273.00 L 376.00 272.00 L 373.00 273.00 L 354.00 274.00 L 350.00 276.00 L 347.00 276.00 L 340.00 280.00 L 330.00 283.00 L 322.00 287.00 L 312.00 289.00 L 309.00 291.00 L 304.00 291.00 L 301.00 293.00 L 281.00 293.00 L 278.00 291.00 L 276.00 291.00 L 270.00 285.00 L 268.00 280.00 L 268.00 271.00 L 267.00 270.00 L 267.00 261.00 L 268.00 260.00 L 268.00 241.00 L 263.00 246.00 L 256.00 250.00 L 254.00 250.00 Z M 196.00 238.00 L 198.00 237.00 L 199.00 239.00 L 197.00 240.00 Z M 147.00 241.00 L 148.00 244.00 L 152.00 247.00 L 156.00 247.00 L 156.00 242.00 L 154.00 241.00 L 154.00 239.00 L 156.00 237.00 L 178.00 237.00 L 182.00 239.00 L 182.00 238.00 L 179.00 235.00 L 150.00 235.00 L 147.00 238.00 Z M 378.00 207.00 L 379.00 206.00 L 398.00 206.00 L 399.00 207.00 L 402.00 207.00 L 408.00 212.00 L 409.00 215.00 L 409.00 222.00 L 403.00 227.00 L 401.00 227.00 L 398.00 229.00 L 382.00 230.00 L 379.00 228.00 L 378.00 225.00 Z M 346.00 199.00 L 340.00 199.00 L 338.00 200.00 L 335.00 205.00 L 336.00 240.00 L 335.00 241.00 L 334.00 250.00 L 330.00 257.00 L 326.00 261.00 L 322.00 263.00 L 317.00 263.00 L 316.00 264.00 L 306.00 263.00 L 302.00 261.00 L 297.00 256.00 L 292.00 242.00 L 292.00 225.00 L 293.00 224.00 L 294.00 216.00 L 295.00 215.00 L 295.00 207.00 L 290.00 203.00 L 285.00 203.00 L 283.00 204.00 L 281.00 208.00 L 281.00 214.00 L 280.00 215.00 L 280.00 231.00 L 279.00 232.00 L 280.00 251.00 L 281.00 252.00 L 281.00 255.00 L 283.00 261.00 L 285.00 263.00 L 286.00 266.00 L 290.00 270.00 L 297.00 274.00 L 304.00 275.00 L 305.00 276.00 L 322.00 276.00 L 323.00 275.00 L 330.00 274.00 L 336.00 271.00 L 344.00 264.00 L 346.00 261.00 L 346.00 259.00 L 348.00 257.00 L 348.00 254.00 L 350.00 250.00 L 350.00 239.00 L 351.00 238.00 L 350.00 206.00 L 349.00 205.00 L 349.00 202.00 Z M 367.00 198.00 L 364.00 200.00 L 362.00 205.00 L 362.00 212.00 L 363.00 213.00 L 363.00 237.00 L 364.00 238.00 L 364.00 266.00 L 365.00 268.00 L 372.00 269.00 L 373.00 268.00 L 376.00 268.00 L 378.00 266.00 L 378.00 243.00 L 381.00 241.00 L 387.00 249.00 L 392.00 253.00 L 396.00 258.00 L 394.00 262.00 L 385.00 268.00 L 385.00 270.00 L 389.00 274.00 L 388.00 271.00 L 391.00 270.00 L 392.00 266.00 L 396.00 263.00 L 397.00 261.00 L 397.00 259.00 L 394.00 256.00 L 394.00 253.00 L 391.00 251.00 L 391.00 249.00 L 389.00 246.00 L 390.00 245.00 L 396.00 246.00 L 402.00 249.00 L 404.00 251.00 L 405.00 254.00 L 404.00 250.00 L 395.00 242.00 L 396.00 241.00 L 404.00 241.00 L 411.00 244.00 L 416.00 250.00 L 418.00 256.00 L 418.00 263.00 L 416.00 266.00 L 416.00 268.00 L 410.00 275.00 L 406.00 276.00 L 403.00 278.00 L 395.00 278.00 L 394.00 279.00 L 391.00 279.00 L 387.00 276.00 L 388.00 278.00 L 393.00 280.00 L 393.00 282.00 L 396.00 286.00 L 396.00 290.00 L 398.00 289.00 L 402.00 289.00 L 403.00 288.00 L 407.00 288.00 L 414.00 285.00 L 420.00 281.00 L 425.00 276.00 L 430.00 266.00 L 430.00 252.00 L 426.00 242.00 L 421.00 237.00 L 415.00 233.00 L 421.00 227.00 L 423.00 223.00 L 423.00 211.00 L 420.00 205.00 L 414.00 200.00 L 404.00 196.00 L 391.00 196.00 L 390.00 195.00 L 389.00 196.00 L 375.00 196.00 L 374.00 197.00 Z M 266.00 190.00 L 264.00 189.00 L 256.00 189.00 L 252.00 194.00 L 252.00 236.00 L 247.00 240.00 L 241.00 241.00 L 240.00 242.00 L 233.00 242.00 L 232.00 243.00 L 216.00 242.00 L 213.00 239.00 L 214.00 238.00 L 213.00 235.00 L 214.00 198.00 L 211.00 194.00 L 206.00 192.00 L 199.00 194.00 L 197.00 197.00 L 197.00 204.00 L 196.00 205.00 L 197.00 232.00 L 190.00 237.00 L 190.00 241.00 L 192.00 245.00 L 196.00 248.00 L 197.00 251.00 L 197.00 281.00 L 198.00 284.00 L 202.00 287.00 L 207.00 287.00 L 209.00 286.00 L 212.00 282.00 L 212.00 262.00 L 213.00 261.00 L 212.00 254.00 L 213.00 253.00 L 211.00 252.00 L 210.00 249.00 L 208.00 247.00 L 209.00 244.00 L 218.00 244.00 L 219.00 245.00 L 240.00 245.00 L 244.00 243.00 L 247.00 243.00 L 256.00 240.00 L 265.00 235.00 L 270.00 230.00 L 272.00 231.00 L 272.00 233.00 L 274.00 232.00 L 274.00 229.00 L 268.00 224.00 L 268.00 211.00 L 269.00 210.00 L 268.00 205.00 L 269.00 204.00 L 269.00 198.00 L 268.00 197.00 L 268.00 193.00 Z M 87.00 194.00 L 78.00 203.00 L 74.00 214.00 L 74.00 221.00 L 76.00 227.00 L 78.00 229.00 L 79.00 232.00 L 86.00 239.00 L 76.00 249.00 L 73.00 255.00 L 72.00 266.00 L 76.00 278.00 L 83.00 286.00 L 91.00 290.00 L 98.00 290.00 L 99.00 291.00 L 126.00 290.00 L 127.00 289.00 L 137.00 288.00 L 138.00 287.00 L 141.00 287.00 L 147.00 285.00 L 151.00 281.00 L 151.00 275.00 L 150.00 272.00 L 147.00 270.00 L 141.00 270.00 L 137.00 272.00 L 132.00 272.00 L 131.00 273.00 L 122.00 274.00 L 117.00 276.00 L 105.00 276.00 L 104.00 275.00 L 99.00 275.00 L 92.00 270.00 L 90.00 265.00 L 91.00 256.00 L 98.00 248.00 L 104.00 245.00 L 124.00 244.00 L 125.00 243.00 L 128.00 243.00 L 129.00 240.00 L 115.00 240.00 L 114.00 237.00 L 117.00 236.00 L 119.00 232.00 L 129.00 232.00 L 133.00 235.00 L 133.00 237.00 L 134.00 237.00 L 134.00 233.00 L 129.00 229.00 L 112.00 229.00 L 111.00 230.00 L 105.00 230.00 L 104.00 229.00 L 101.00 229.00 L 97.00 226.00 L 95.00 226.00 L 95.00 227.00 L 100.00 231.00 L 103.00 232.00 L 113.00 232.00 L 114.00 233.00 L 113.00 235.00 L 102.00 235.00 L 101.00 234.00 L 98.00 234.00 L 93.00 230.00 L 90.00 226.00 L 91.00 224.00 L 93.00 224.00 L 92.00 218.00 L 90.00 217.00 L 90.00 210.00 L 93.00 209.00 L 92.00 207.00 L 88.00 208.00 L 87.00 213.00 L 86.00 214.00 L 84.00 213.00 L 84.00 210.00 L 85.00 209.00 L 84.00 205.00 L 85.00 202.00 L 87.00 200.00 L 91.00 200.00 L 91.00 196.00 L 94.00 193.00 L 97.00 193.00 L 98.00 194.00 L 98.00 201.00 L 96.00 207.00 L 99.00 205.00 L 102.00 205.00 L 103.00 204.00 L 128.00 204.00 L 129.00 205.00 L 137.00 205.00 L 138.00 206.00 L 143.00 205.00 L 146.00 201.00 L 146.00 196.00 L 145.00 194.00 L 140.00 190.00 L 118.00 190.00 L 117.00 189.00 L 104.00 189.00 L 98.00 191.00 L 97.00 190.00 Z"
                />
                <path
                  id="logo-accent"
                  className="logo-accent"
                  d="M 397.00 293.00 L 395.00 290.00 L 395.00 286.00 L 392.00 282.00 L 392.00 280.00 L 388.00 279.00 L 386.00 276.00 L 384.00 277.00 L 380.00 277.00 L 379.00 276.00 L 368.00 276.00 L 366.00 275.00 L 365.00 276.00 L 359.00 276.00 L 358.00 278.00 L 356.00 277.00 L 350.00 278.00 L 348.00 279.00 L 346.00 282.00 L 337.00 286.00 L 335.00 286.00 L 332.00 288.00 L 322.00 289.00 L 311.00 293.00 L 306.00 293.00 L 303.00 295.00 L 279.00 295.00 L 276.00 293.00 L 274.00 293.00 L 271.00 303.00 L 275.00 306.00 L 280.00 308.00 L 304.00 307.00 L 308.00 305.00 L 312.00 305.00 L 316.00 303.00 L 319.00 303.00 L 355.00 287.00 L 358.00 287.00 L 362.00 285.00 L 373.00 284.00 L 374.00 285.00 L 379.00 285.00 L 385.00 288.00 L 385.00 295.00 L 384.00 296.00 L 381.00 296.00 L 380.00 295.00 L 376.00 295.00 L 374.00 293.00 L 371.00 293.00 L 370.00 294.00 L 368.00 293.00 L 361.00 293.00 L 360.00 297.00 L 364.00 303.00 L 364.00 305.00 L 368.00 305.00 L 371.00 309.00 L 382.00 310.00 L 383.00 309.00 L 387.00 309.00 L 395.00 302.00 L 397.00 297.00 Z M 92.00 257.00 L 91.00 265.00 L 93.00 270.00 L 94.00 270.00 L 92.00 264.00 L 93.00 262.00 L 93.00 257.00 Z M 390.00 246.00 L 392.00 249.00 L 392.00 251.00 L 395.00 253.00 L 395.00 256.00 L 398.00 259.00 L 398.00 261.00 L 397.00 263.00 L 393.00 266.00 L 392.00 270.00 L 389.00 271.00 L 389.00 273.00 L 393.00 275.00 L 397.00 275.00 L 405.00 268.00 L 407.00 265.00 L 407.00 260.00 L 406.00 259.00 L 406.00 256.00 L 402.00 250.00 L 396.00 247.00 Z M 155.00 239.00 L 155.00 241.00 L 157.00 242.00 L 157.00 247.00 L 160.00 248.00 L 166.00 248.00 L 167.00 249.00 L 179.00 248.00 L 182.00 247.00 L 184.00 244.00 L 183.00 241.00 L 178.00 238.00 L 156.00 238.00 Z M 119.00 235.00 L 121.00 234.00 L 122.00 236.00 L 120.00 237.00 Z M 115.00 237.00 L 115.00 239.00 L 129.00 239.00 L 130.00 240.00 L 129.00 243.00 L 135.00 241.00 L 135.00 238.00 L 133.00 238.00 L 132.00 235.00 L 129.00 233.00 L 119.00 233.00 L 119.00 235.00 L 117.00 237.00 Z M 273.00 234.00 L 272.00 234.00 L 271.00 231.00 L 270.00 231.00 L 262.00 238.00 L 256.00 241.00 L 247.00 244.00 L 244.00 244.00 L 240.00 246.00 L 219.00 246.00 L 218.00 245.00 L 209.00 245.00 L 209.00 247.00 L 211.00 249.00 L 212.00 252.00 L 215.00 253.00 L 217.00 255.00 L 224.00 255.00 L 225.00 256.00 L 242.00 255.00 L 243.00 253.00 L 250.00 253.00 L 254.00 249.00 L 256.00 249.00 L 263.00 245.00 L 273.00 236.00 Z M 94.00 194.00 L 92.00 196.00 L 92.00 200.00 L 91.00 201.00 L 87.00 201.00 L 85.00 205.00 L 86.00 207.00 L 85.00 213.00 L 86.00 213.00 L 86.00 210.00 L 88.00 207.00 L 92.00 206.00 L 94.00 208.00 L 93.00 210.00 L 91.00 210.00 L 91.00 217.00 L 93.00 218.00 L 93.00 221.00 L 94.00 222.00 L 94.00 224.00 L 91.00 225.00 L 92.00 228.00 L 98.00 233.00 L 101.00 233.00 L 102.00 234.00 L 113.00 234.00 L 113.00 233.00 L 103.00 233.00 L 100.00 232.00 L 94.00 227.00 L 94.00 226.00 L 96.00 225.00 L 95.00 207.00 L 97.00 201.00 L 97.00 194.00 Z"
                />
              </g>
            </svg>
          </Link>
        </div>

        {/* =========================
            Navigation
        ========================= */}

        <nav
          className="
            hidden md:flex
            items-center
            rounded-full
            border border-border-subtle
            bg-surface-elevated/80
            p-1.5
            shadow-inner
            backdrop-blur-md
          "
        >
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/shop" className={navLinkClass}>
            Shop
          </NavLink>

          <NavLink to="/orders" className={navLinkClass}>
            My Orders
          </NavLink>

          <NavLink to="/wishlist" className={navLinkClass}>
            Wishlist
          </NavLink>
        </nav>

        {/* =========================
            Actions
        ========================= */}

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme */}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={iconButtonClass}
          >
            {isDark ? (
              <FiSun size={20} className="text-accent" />
            ) : (
              <FiMoon size={20} />
            )}
          </button>

          {/* Wishlist */}

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className={iconButtonClass}
          >
            <FiHeart size={20} />

            {wishlistCount > 0 && (
              <span
                className="
                  absolute -right-1.5 -top-1.5
                  flex h-5 w-5
                  items-center justify-center
                  rounded-full
                  border-2 border-surface-card
                  bg-accent
                  text-[10px]
                  font-bold
                  text-white
                "
              >
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}

          <Link
            to="/cart"
            aria-label="Shopping cart"
            className="
              relative
              mx-1
              flex items-center justify-center
              rounded-full
              bg-accent-light
              p-2.5
              text-accent
              transition-all
              hover:bg-accent
              hover:text-white
            "
          >
            <FiShoppingCart size={20} />

            {cartCount > 0 && (
              <span
                className="
                  absolute -right-1.5 -top-1.5
                  flex h-5 w-5
                  items-center justify-center
                  rounded-full
                  border-2 border-surface-card
                  bg-accent
                  text-[10px]
                  font-bold
                  text-white
                  shadow-sm
                "
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* =========================
              Authentication
          ========================= */}

          {!user ? (
            <>
              {/* Login */}

              <Link
                to="/login"
                className="
                  hidden sm:flex
                  items-center gap-1.5
                  rounded-lg
                  border border-border-strong
                  px-3 py-2
                  text-sm font-semibold
                  text-text-secondary
                  transition-all
                  hover:border-accent
                  hover:bg-accent-light
                  hover:text-accent
                "
              >
                <FiLogIn size={17} />

                <span>Login</span>
              </Link>

              {/* Register */}

              <Link
                to="/register"
                className="
                  flex items-center gap-1.5
                  rounded-lg
                  bg-accent
                  px-3 sm:px-4
                  py-2
                  text-sm font-bold
                  tracking-wide
                  text-white
                  shadow-md
                  shadow-accent/20
                  transition-all
                  hover:bg-accent-hover
                  hover:shadow-lg
                  hover:shadow-accent/25
                "
              >
                <FiUserPlus size={17} />

                <span>Register</span>
              </Link>
            </>
          ) : (
            /* =========================
               Logged User
            ========================= */

            <Link
              to="/profile"
              className="
                ml-1
                flex max-w-40
                items-center gap-2
                rounded-lg
                bg-accent
                px-3 sm:px-4
                py-2
                text-sm font-bold
                tracking-wide
                text-white
                shadow-md
                shadow-accent/20
                transition-all
                hover:bg-accent-hover
                hover:shadow-lg
                hover:shadow-accent/25
              "
            >
              <FiUser size={18} className="shrink-0" />

              <span className="truncate">{userName}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
