
import { AuthContext } from "@/contexts/auth-context";
import { useContext } from "react";

function useAuthContext() {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error('Cannot use auth context outside auth provider');
    }
    return context;
};

export default useAuthContext;