import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { LoginPayload, LoginResponse } from './types';

import authService from './services';

export const loginMutation = {
    useMutation: (opt?: UseMutationOptions<LoginResponse, Error, LoginPayload, void>) => 
        useMutation({
            mutationKey: ['login'],
            mutationFn: (payload: LoginPayload) => authService.login(payload),
            ...opt,
        })
    
}