// buildQueryParams.ts
export const buildQueryParams = (params: Record<string, any>): string => {
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            urlParams.append(key, value.toString());
        }
    });
    return urlParams.toString();
};
