import { RegisterSimpleInput } from '@shared/service-proxies/service-proxies';

export class RegisterModel extends RegisterSimpleInput {
    public passwordRepeat: string;
}
