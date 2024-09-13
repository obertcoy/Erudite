import React from "react";

interface PublicLayoutProps {
    children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
    return (
        <>
            {children}
        </>
    );
}

export default PublicLayout;
