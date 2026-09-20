"use client";

import Link from "next/link";
import { Mail, AlertCircle, ArrowRight, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";
import { useLoginViewModel } from "../Login.viewmodel";

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function LoginForm() {
  const { form, errors, loading, serverError, onChange, onSubmit } =
    useLoginViewModel();

  return (
    <motion.form
      onSubmit={onSubmit}
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={itemVariants}>
        <Input
          id="email"
          name="email"
          type="email"
          label="Email address"
          icon={Mail}
          placeholder="you@example.com"
          value={form.email}
          onChange={onChange}
          error={errors.email}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <PasswordInput
          id="password"
          name="password"
          label="Password"
          placeholder="••••••••"
          value={form.password}
          onChange={onChange}
          error={errors.password}
        />
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-end pt-0.5">
        <Link
          href="/forgot-password"
          className="text-xs font-medium text-primary hover:text-primary/80 transition-colors hover:underline"
        >
          Forgot password?
        </Link>
      </motion.div>

      {/* Server Error Alert */}
      {serverError && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2.5 rounded-xl border border-danger/30 bg-danger/10 p-3 text-xs font-medium text-danger"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{serverError}</span>
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="pt-2">
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <Button
            type="submit"
            loading={loading}
            className="w-full justify-center gap-2 shadow-lg shadow-primary/25 transition-all duration-200"
          >
            <span>Sign in</span>
            {!loading && <ArrowRight className="h-4 w-4" />}
          </Button>
        </motion.div>
      </motion.div>
    </motion.form>
  );
}
