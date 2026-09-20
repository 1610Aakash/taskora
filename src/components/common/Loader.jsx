export default function Loader({ size = 'md', message = 'Loading...' }) {
  const sizeMap = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-8">
      <div className={`${sizeMap[size]} rounded-full border-2 border-border border-t-primary animate-spin`} />
      {message && <p className="text-muted text-sm">{message}</p>}
    </div>
  );
}
