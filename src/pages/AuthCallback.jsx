import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      // Get the hash fragment from the URL
      const hashFragment = window.location.hash;
      const params = new URLSearchParams(hashFragment.replace("#", "?"));

      // Check if this is a password reset callback
      if (params.get("type") === "recovery") {
        // Store the access token for the reset password page
        const accessToken = params.get("access_token");
        if (accessToken) {
          sessionStorage.setItem("resetToken", accessToken);
          navigate("/reset-password");
          return;
        }
      }

      // For other auth callbacks, redirect to dashboard if authenticated
      if (session) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default AuthCallback;
