import { useRouteError, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl text-center">
        <div className="card-body">
          {/* Icon */}
          <div className="text-7xl mb-4">🚫</div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-error">Oops!</h1>

          {/* Message */}
          <p className="text-base-content mt-2">
            Sorry, an unexpected error has occurred.
          </p>

          {/* Error status */}
          <p className="text-sm opacity-70 mt-1">
            {error?.status || 404} – {error?.statusText || "Page Not Found"}
          </p>

          {/* Actions */}
          <div className="card-actions justify-center mt-6 gap-3">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/")}
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
