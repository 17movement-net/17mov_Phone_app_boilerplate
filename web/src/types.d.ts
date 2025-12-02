declare function openGalleryPicker(
    onSelected: (data: string | string[]) => void,
    multiple?: boolean = false,
    type: 'image' | 'video' | 'both' = 'image',
    enableLink?: boolean,
): void;

declare function openCameraComponent(
    onCaptured: (data: string) => void,
    disablePhoto?: boolean,
    disableVideo?: boolean,
): void;

declare function openContactPicker(onSelected: (number: string) => void): void;

declare function openGIFPicker(onSelected: (data: string) => void): void;

declare function openEmojiPicker(onSelected: (data: string) => void): void;

declare function setKeepInput(options: boolean): void;

declare function handleLogin(
    username: string,
    password: string
): Promise<{ success: boolean; message: string; }>;

declare function handleRegister(
    username: string,
    password: string,
    accountData: unknown,
): Promise<{ success: boolean; message: string; }>;

declare function useCurrentUser(): { username: string; accountData: unknown } | null;

declare function useIsAuthenticated(): boolean;

declare function useSignOut(): void;

declare function setExternalRouting(
    resourceName: string,
    routes: {
        path?: string;
        index?: boolean;
        element?: ReactNode;
        framerMotion?: boolean;
        className?: string;
        classNameOverride?: string;
        motion?: {
            initial?: HTMLMotionProps<'div'>['initial'];
            animate?: HTMLMotionProps<'div'>['animate'];
            exit?: HTMLMotionProps<'div'>['exit'];
        };
    }[],
): void;

declare function startCall(to: string, type?: 'phone' | 'video'): void;

declare function LoadRoot(): void;

declare function useSettings(): SettingsType;

declare function getCurrentNumber(): string;