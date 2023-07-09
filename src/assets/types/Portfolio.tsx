export const StatusDeal = {
    Active: "Активен",
    Reinvest: "Реинвестирован",
    Term: "Выплачены проценты",
    Terminate: "Завершен",
};

export type DealType = {
    id: number;
    partnerId: number;
    endDate: string;
    startDate: string;
    statusChangedDate: string;
    status: string;
    sum: number;
    sumUsd: number;
    sumIncome: number;
    programId: number;
    programName: string;
    speedPercent: number;
    speedEndDate: string;
    insurance: boolean;
    canReplenish: boolean;
    canInsure: boolean;
    insuranceEndDate: string | null; //отдаётся либо дата до которой активна страховка, либо null
    isPromo: boolean;
};