"use client";

import { AuthenticatedPageContainer, PageHeader, EmptyState } from "@/components/shared/AuthenticatedPageLayout";
import { Truck } from "lucide-react";

export default function TrackingPage() {
    return (
        <AuthenticatedPageContainer maxWidth="5xl">
            <PageHeader
                title="Order Tracking"
                description="Monitor the real-time status of your harvest deliveries."
            />

            <EmptyState
                icon={Truck}
                title="No active tracking"
                description="You don't have any active deliveries at the moment. Your tracking history will appear here once an order is shipped."
                actionLabel="View All Orders"
                actionHref="/orders"
            />
        </AuthenticatedPageContainer>
    );
}
