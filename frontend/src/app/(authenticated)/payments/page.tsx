"use client";

import { AuthenticatedPageContainer, PageHeader, EmptyState } from "@/components/shared/AuthenticatedPageLayout";
import { CreditCard } from "lucide-react";

export default function PaymentsPage() {
    return (
        <AuthenticatedPageContainer maxWidth="5xl">
            <PageHeader
                title="Payment Methods"
                description="Manage your payment methods and billing history."
            />

            <EmptyState
                icon={CreditCard}
                title="No payment methods"
                description="You haven't saved any payment methods yet. Link a card to make checkout faster."
                actionLabel="Add Payment Method"
                onAction={() => alert("Payment logic not yet implemented")}
            />
        </AuthenticatedPageContainer>
    );
}
