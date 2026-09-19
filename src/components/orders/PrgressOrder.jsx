import { CiCircleInfo } from "react-icons/ci";
function PrgressOrder({ status }) {
  return (
    <div className="bg-surface-card border border-border-subtle rounded-3xl p-5 sm:p-7 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-text-primary">Order Progress</h2>
        <p className="text-sm text-text-muted mt-1">Track your order status</p>
      </div>
      {(() => {
        const steps = [
          "pending",
          "confirmed",
          "processing",
          "shipped",
          "delivered",
        ];

        const currentIndex = steps.indexOf(status?.toLowerCase());
        return (
          <div className="relative px-2 sm:px-4">
            {/* Progress Line */}
            <div className="absolute top-4 left-[10%] right-[10%] h-1 rounded-full bg-surface-elevated">
              <div
                className="h-full rounded-full bg-accent transition-all duration-700"
                style={{
                  width:
                    currentIndex < 0
                      ? "0%"
                      : `${(currentIndex / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>

            {/* Steps */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const isCompleted = index <= currentIndex;
                return (
                  <div
                    key={step}
                    className="flex flex-col items-center gap-3 w-[20%]"
                  >
                    {/* Circle */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                        isCompleted
                          ? "bg-accent border-accent text-white shadow-md shadow-accent/20"
                          : "bg-surface-card border-border-strong text-text-muted"
                      }`}
                    >
                      {isCompleted ? (
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path
                            d="M5 12l4 4L19 6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <span className="text-md font-semibold">
                          <CiCircleInfo width={20} height={20} />
                        </span>
                      )}
                    </div>

                    {/* Label */}
                    <span
                      className={`text-[10px] sm:text-sm text-center capitalize font-semibold ${
                        isCompleted ? "text-accent" : "text-text-muted"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

export default PrgressOrder;
