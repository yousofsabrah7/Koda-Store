import {
  LayoutDashboard,
  RotateCcw,
  Save,
  ShieldCheck,
  User,
} from "lucide-react";
import { useEffect } from "react";

import useSettings from "../../services/customHooks/useSettings";
import { useProfile } from "../../services/apiHooks/authHook";

import {
  AdminProfileCard,
  DashboardPreview,
  SelectSetting,
  SettingRow,
  SettingsSection,
  ThemeSelector,
  Toggle,
} from "../../components/settings/components";

const Settings = () => {
  const {
    theme,
    sidebarCollapsed,
    pageSize,
    tableDensity,
    updateTheme,
    updateSidebarCollapsed,
    updatePageSize,
    updateTableDensity,
    resetAllSettings,
  } = useSettings();

  const {
    data: profileData,
    isLoading: isProfileLoading,
  } = useProfile();

  /*
   * Apply theme globally.
   *
   * Redux is the source of truth.
   * The DOM class is only the visual implementation.
   */
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      root.classList.toggle("dark", systemDark);
    }
  }, [theme]);

  const profile = profileData?.user || profileData?.data || profileData;

  return (
    <main className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 rounded-3xl border border-border-subtle bg-surface-elevated p-5 sm:flex-row sm:items-center md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[1px] text-accent">
              Dashboard Configuration
            </p>

            <h2 className="mt-1 text-2xl font-extrabold text-text-primary md:text-3xl">
              Settings
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
              Manage your dashboard preferences and administrator
              information from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={resetAllSettings}
            className="
              flex h-11 items-center justify-center gap-2
              rounded-xl border border-border-subtle
              bg-surface-card px-4 text-sm font-medium
              text-text-secondary transition-all duration-200
              hover:border-border-strong
              hover:bg-surface-base
              hover:text-text-primary
            "
          >
            <RotateCcw size={16} />
            Reset Settings
          </button>
        </div>

        {/* Dashboard Settings */}
        <SettingsSection
          icon={LayoutDashboard}
          title="Dashboard"
          description="Control the appearance and behavior of your admin dashboard."
        >
          <div className="divide-y divide-border-subtle">
            {/* Theme */}
            <SettingRow
              title="Theme"
              description="Choose how the dashboard should appear."
            >
              <ThemeSelector
                value={theme}
                onChange={updateTheme}
              />
            </SettingRow>

            {/* Sidebar */}
            <SettingRow
              title="Sidebar"
              description="Show or hide the dashboard sidebar."
            >
              <Toggle
                checked={!sidebarCollapsed}
                onChange={(value) =>
                  updateSidebarCollapsed(!value)
                }
                label="Show sidebar"
              />
            </SettingRow>

            {/* Page Size */}
            <SettingRow
              title="Default Page Size"
              description="Choose how many records should appear in paginated tables."
            >
              <SelectSetting
                value={String(pageSize)}
                onChange={(value) =>
                  updatePageSize(Number(value))
                }
                ariaLabel="Default page size"
                options={[
                  {
                    value: "5",
                    label: "5 items",
                  },
                  {
                    value: "10",
                    label: "10 items",
                  },
                  {
                    value: "20",
                    label: "20 items",
                  },
                  {
                    value: "50",
                    label: "50 items",
                  },
                ]}
              />
            </SettingRow>

            {/* Table Density */}
            <SettingRow
              title="Table Density"
              description="Control the spacing inside dashboard tables."
            >
              <SelectSetting
                value={tableDensity}
                onChange={updateTableDensity}
                ariaLabel="Table density"
                options={[
                  {
                    value: "compact",
                    label: "Compact",
                  },
                  {
                    value: "comfortable",
                    label: "Comfortable",
                  },
                  {
                    value: "spacious",
                    label: "Spacious",
                  },
                ]}
              />
            </SettingRow>
          </div>
        </SettingsSection>

        {/* Dashboard Preview */}
        <SettingsSection
          icon={LayoutDashboard}
          title="Dashboard Preview"
          description="Preview how your current dashboard preferences will look."
        >
          <DashboardPreview
            theme={theme}
            sidebarCollapsed={sidebarCollapsed}
          />
        </SettingsSection>

        {/* Admin Settings */}
        <SettingsSection
          icon={ShieldCheck}
          title="Administrator"
          description="View the administrator account currently connected to the dashboard."
        >
          <AdminProfileCard
            profile={profile}
            isLoading={isProfileLoading}
          />
        </SettingsSection>

        {/* Account Information */}
        <SettingsSection
          icon={User}
          title="Account"
          description="Administrator account information retrieved from your account service."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border-subtle bg-surface-base p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[1px] text-text-muted">
                Account Status
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500" />

                <span className="text-sm font-semibold text-text-primary">
                  Active
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-border-subtle bg-surface-base p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[1px] text-text-muted">
                Access Level
              </p>

              <p className="mt-2 text-sm font-semibold text-text-primary">
                Administrator
              </p>
            </div>
          </div>
        </SettingsSection>

        {/* Information */}
        <div className="mb-8 rounded-2xl border border-border-subtle bg-surface-card p-4">
          <div className="flex gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent">
              <Save size={16} />
            </div>

            <div>
              <p className="text-sm font-semibold text-text-primary">
                Settings are applied instantly
              </p>

              <p className="mt-1 text-xs leading-5 text-text-muted">
                Dashboard preferences are managed through Redux and
                are immediately available across the application.
                Administrator information is retrieved from the
                existing profile service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;