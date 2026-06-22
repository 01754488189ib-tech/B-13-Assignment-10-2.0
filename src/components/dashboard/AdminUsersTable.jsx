"use client";

import React, { useState } from "react";
import {
  Person,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Trash,
} from "@gravity-ui/icons";
import { updateUserRole, deleteUser } from "@/lib/actions/users";

export default function AdminUsersTable({ users }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingChange, setPendingChange] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const initiateRoleChange = (userId, userName, newRole) => {
    setPendingChange({ userId, userName, newRole });
    setIsConfirmOpen(true);
  };

  const confirmRoleChange = async () => {
    if (!pendingChange) return;
    setIsUpdating(true);
    try {
      const { userId, newRole } = pendingChange;
      await updateUserRole(userId, newRole);
    } catch (error) {
      console.error("Failed to update user role:", error);
    } finally {
      setIsUpdating(false);
      setIsConfirmOpen(false);
      setPendingChange(null);
    }
  };

  const handleDelete = async (userId) => {
    if (confirm("Are you sure you want to remove this user from Fable?")) {
      await deleteUser(userId);
    }
  };

  return (
    <div className="relative w-full">
      <div className="w-full bg-[#0b0b0f] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs text-zinc-400">
            <thead>
              <tr className="border-b border-white/5 text-zinc-500 font-semibold select-none bg-white/[0.01]">
                <th className="py-5 px-6">User Name</th>
                <th className="py-5 px-6">Email Address</th>
                <th className="py-5 px-6">System Role</th>
                <th className="py-5 px-6">Writer Status</th>
                <th className="py-5 px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/[0.02]">
              {users.map((user) => {
                const userId = user._id || user.id;
                const userRole = user.role?.toLowerCase() || "user";

                return (
                  <tr
                    key={userId}
                    className="hover:bg-white/[0.01] transition-colors"
                  >
                    <td className="py-4 px-6 font-semibold text-white whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-xs text-amber-500 font-bold">
                          {user.name ? user.name[0].toUpperCase() : "U"}
                        </div>
                        <span>{user.name || "Unknown User"}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-zinc-400 whitespace-nowrap">
                      {user.email}
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      {userRole === "writer" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                          <Briefcase width={10} height={10} />
                          Writer
                        </span>
                      ) : userRole === "admin" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-wider">
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded-full bg-zinc-800 text-zinc-400 border border-white/5 uppercase tracking-wider">
                          <Person width={10} height={10} />
                          Reader
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      {user.verifiedWriter ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-zinc-800/40 text-zinc-500 border border-white/5">
                          Unverified
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-right whitespace-nowrap font-medium">
                      <div className="flex items-center justify-end gap-3">
                        {userRole !== "admin" && (
                          <button
                            onClick={() =>
                              initiateRoleChange(userId, user.name, "admin")
                            }
                            className="text-zinc-500 hover:text-white transition"
                          >
                            Make Admin
                          </button>
                        )}
                        {userRole !== "writer" && (
                          <button
                            onClick={() =>
                              initiateRoleChange(userId, user.name, "writer")
                            }
                            className="text-zinc-400 hover:text-amber-400 transition"
                          >
                            Make Writer
                          </button>
                        )}
                        {userRole !== "user" && (
                          <button
                            onClick={() =>
                              initiateRoleChange(userId, user.name, "user")
                            }
                            className="text-zinc-400 hover:text-amber-400 transition"
                          >
                            Make Reader
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(userId)}
                          className="text-red-500 hover:text-red-400 transition pl-3 border-l border-white/5"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Dialog Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#0b0b0f] border border-white/5 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">
                Confirm Role Assignment
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Are you sure you want to change the platform role of{" "}
                <span className="text-white font-semibold">
                  {pendingChange?.userName}
                </span>{" "}
                to{" "}
                <span className="text-amber-500 font-bold capitalize">
                  {pendingChange?.newRole}
                </span>
                ? This updates system authorization immediately.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 text-xs font-semibold">
              <button
                disabled={isUpdating}
                onClick={() => {
                  setIsConfirmOpen(false);
                  setPendingChange(null);
                }}
                className="px-4 py-2 text-zinc-400 hover:text-white bg-white/5 rounded-xl border border-white/5 transition"
              >
                Cancel
              </button>
              <button
                disabled={isUpdating}
                onClick={confirmRoleChange}
                className="px-4 py-2 text-black bg-amber-500 hover:bg-amber-400 rounded-xl transition shadow-lg shadow-amber-500/5 min-w-[76px] flex items-center justify-center"
              >
                {isUpdating ? (
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
