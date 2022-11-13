import { Outlet } from '@tanstack/react-router'

export function Layout() {
  return (
    <div>
      <header className="w-full bg-slate-700 py-5 shadow-md fixed">
        <h1 className="text-white text-center font-logo select-none">
          <span className="text-4xl font-bold">GitHub</span>
          <span className="text-2xl font-semibold"> Explorer</span>
        </h1>
      </header>

      <div className="pt-20">
        <Outlet />
      </div>
    </div>
  )
}