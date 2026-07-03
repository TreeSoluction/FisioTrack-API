export const BILLING_PLANS = {
  monthly: {
    price: 19.9,
    label: 'Mensal',
    mpFrequency: 1,
    mpFrequencyType: 'months',
  },
  yearly: {
    price: 190.0,
    label: 'Anual',
    mpFrequency: 12,
    mpFrequencyType: 'months',
  },
} as const;

export type BillingPlanType = keyof typeof BILLING_PLANS;
