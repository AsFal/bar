export function apply<T>(func: (...info: any[]) => T, ...args: any[]): (...otherInfo: any[]) => T {
    return (...otherArgs) => {
        return func(...args, ...otherArgs);
    };
}

