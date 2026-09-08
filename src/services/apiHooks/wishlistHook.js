import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { adminWishlist, adminWishlistStatus } from "../api/wishlistApi";
import { useDispatch } from "react-redux";

export const useAdminWishlist = (page, limit) => {
  const dispatch = useDispatch();
  const query = useQuery({
    queryKey: ["adminWishlist", page, limit],
    queryFn: () => adminWishlist(page, limit),
    enabled: !!page && !!limit,
  });

  if (query.isError) {
    const message =
      query.error?.response?.data?.message || "Something went wrong";

    toast.error(message);
  }

  return query;
};

export const useAdminWishlistStatus = () => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["adminWishlistStatus"],
    queryFn: adminWishlistStatus,
  });

  if (query.isError) {
    const message =
      query.error?.response?.data?.message || "Something went wrong";

    toast.error(message);
  }

  return query;
};
