interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-12 px-4">
      <div className="text-cosmic-400 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center max-w-sm mb-6">{description}</p>
      {action && (
        action.href ? (
          <a
            href={action.href}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-cosmic-600 text-white font-medium hover:bg-cosmic-700 transition-colors"
          >
            {action.label}
          </a>
        ) : (
          <button
            onClick={action.onClick}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-cosmic-600 text-white font-medium hover:bg-cosmic-700 transition-colors"
          >
            {action.label}
          </button>
        )
      )}
    </div>
  );
}
