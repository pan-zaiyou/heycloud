export type ResetPasswordPayload = {
  email: string;
  password: string;
  email_code: string;
  @if (session('status'))
    <div class="alert alert-success">
        {{ __('Your password has been successfully reset! Please log in with your new password.') }}
    </div>
@endif
};
