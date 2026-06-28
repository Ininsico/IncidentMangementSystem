import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../constants/app_colors.dart';
import '../services/auth_service.dart';
import '../services/api_service.dart';
import '../widgets/animated_bg.dart';
import 'home_page.dart';
import 'verification_screen.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _auth = AuthService();
  bool _isSignUp = false;
  bool _loading = false;
  String? _error;

  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _nameController = TextEditingController();
  final _phoneController = TextEditingController();
  final _confirmController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _nameController.dispose();
    _phoneController.dispose();
    _confirmController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    setState(() {
      _loading = true;
      _error = null;
    });

    try {
      if (_isSignUp) {
        if (_passwordController.text != _confirmController.text) {
          throw Exception('Passwords do not match');
        }
        if (_nameController.text.trim().isEmpty) {
          throw Exception('Name is required');
        }
        final result = await _auth.signUp(
          email: _emailController.text.trim(),
          password: _passwordController.text,
          name: _nameController.text.trim(),
          phone: _phoneController.text.trim(),
        );

        if (mounted) {
          final email = result['email'] as String;
          Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (_) => VerificationScreen(email: email)),
          );
        }
      } else {
        await _auth.signIn(
          email: _emailController.text.trim(),
          password: _passwordController.text,
        );

        if (mounted) {
          Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (_) => const HomePage()),
          );
        }
      }
    } catch (err) {
      if (err is ApiException && err.data?['code'] == 'EMAIL_NOT_VERIFIED') {
        final email = err.data!['email'] as String;
        if (mounted) {
          Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (_) => VerificationScreen(email: email)),
          );
        }
        return;
      }
      setState(() {
        _error = err.toString().replaceFirst('Exception: ', '');
      });
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnimatedBg(
        child: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const SizedBox(height: 32),
                    Image.asset('assets/logo.png', width: 100, height: 100),
                    const SizedBox(height: 16),
                    if (_isSignUp)
                      AnimatedSwitcher(
                        duration: const Duration(milliseconds: 250),
                        transitionBuilder: (w, a) => FadeTransition(opacity: a, child: w),
                        child: Text(
                          'CREATE ACCOUNT',
                          key: ValueKey(_isSignUp),
                          style: GoogleFonts.sora(
                            fontSize: 16,
                            fontWeight: FontWeight.w700,
                            color: AppColors.textPrimary,
                            letterSpacing: 3,
                          ),
                        ),
                      ),
                    const SizedBox(height: 24),
                    _buildField(label: 'EMAIL', hint: 'you@example.com', controller: _emailController, type: TextInputType.emailAddress),
                    const SizedBox(height: 14),
                    _buildField(label: 'PASSWORD', hint: '••••••••', controller: _passwordController, obscure: true),
                    const SizedBox(height: 8),
                    if (!_isSignUp)
                      Align(
                        alignment: Alignment.centerRight,
                        child: TextButton(
                          onPressed: () {},
                          style: TextButton.styleFrom(
                            padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 4),
                          ),
                          child: Text(
                            'Forgot password?',
                            style: GoogleFonts.dmSans(
                              fontSize: 12,
                              fontWeight: FontWeight.w600,
                              color: AppColors.accentDark,
                              letterSpacing: 0.5,
                            ),
                          ),
                        ),
                      ),
                    AnimatedSize(
                      duration: const Duration(milliseconds: 350),
                      curve: Curves.easeInOut,
                      alignment: Alignment.topCenter,
                      child: _isSignUp
                          ? Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                const SizedBox(height: 4),
                                _buildField(label: 'FULL NAME', hint: 'Ahmed Khan', controller: _nameController),
                                const SizedBox(height: 14),
                                _buildField(label: 'PHONE', hint: '+92 300 1234567', controller: _phoneController, type: TextInputType.phone),
                                const SizedBox(height: 14),
                                _buildField(label: 'CONFIRM PASSWORD', hint: 'Re-enter password', controller: _confirmController, obscure: true),
                              ],
                            )
                          : const SizedBox.shrink(),
                    ),
                    if (_error != null)
                      Padding(
                        padding: const EdgeInsets.only(top: 12),
                        child: Text(
                          _error!,
                          style: GoogleFonts.dmSans(
                            fontSize: 13,
                            fontWeight: FontWeight.w500,
                            color: AppColors.error,
                          ),
                        ),
                      ),
                    const SizedBox(height: 16),
                    SizedBox(
                      width: 340,
                      child: Column(
                        children: [
                          GestureDetector(
                            onTap: _loading ? null : _submit,
                            child: Container(
                              width: double.infinity,
                              height: 50,
                              decoration: BoxDecoration(
                                color: AppColors.primary,
                                borderRadius: BorderRadius.circular(6),
                              ),
                              child: Center(
                                child: _loading
                                    ? const SizedBox(
                                        width: 20,
                                        height: 20,
                                        child: CircularProgressIndicator(
                                          strokeWidth: 2.5,
                                          color: AppColors.textOnDark,
                                        ),
                                      )
                                    : Text(
                                        _isSignUp ? 'REGISTER' : 'LOGIN',
                                        style: GoogleFonts.sora(
                                          fontSize: 15,
                                          fontWeight: FontWeight.w700,
                                          color: AppColors.textOnDark,
                                          letterSpacing: 4,
                                        ),
                                      ),
                              ),
                            ),
                          ),
                          const SizedBox(height: 12),
                          GestureDetector(
                            onTap: _loading ? null : () => setState(() => _isSignUp = !_isSignUp),
                            child: Container(
                              width: double.infinity,
                              height: 50,
                              decoration: BoxDecoration(
                                border: Border.all(color: AppColors.accent, width: 2),
                                borderRadius: BorderRadius.circular(6),
                                color: AppColors.surface,
                              ),
                              child: Center(
                                child: Text(
                                  _isSignUp ? 'BACK TO LOGIN' : 'SIGN UP',
                                  style: GoogleFonts.sora(
                                    fontSize: 15,
                                    fontWeight: FontWeight.w700,
                                    color: AppColors.accent,
                                    letterSpacing: 4,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 32),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildField({
    required String label,
    required String hint,
    required TextEditingController controller,
    bool obscure = false,
    TextInputType? type,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 4, bottom: 6),
          child: Text(
            label,
            style: GoogleFonts.dmSans(
              fontSize: 11,
              fontWeight: FontWeight.w700,
              color: AppColors.primaryLight,
              letterSpacing: 1.5,
            ),
          ),
        ),
        Container(
          decoration: BoxDecoration(
            border: Border.all(color: AppColors.border, width: 2),
            borderRadius: BorderRadius.circular(6),
            color: AppColors.inputFill,
          ),
          child: TextField(
            controller: controller,
            obscureText: obscure,
            keyboardType: type,
            style: GoogleFonts.dmSans(
              fontSize: 15,
              fontWeight: FontWeight.w500,
              color: AppColors.textPrimary,
            ),
            decoration: InputDecoration(
              contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
              hintText: hint,
              hintStyle: GoogleFonts.dmSans(
                fontSize: 15,
                fontWeight: FontWeight.w400,
                color: AppColors.textSecondary,
              ),
              border: InputBorder.none,
              focusedBorder: InputBorder.none,
            ),
          ),
        ),
      ],
    );
  }
}


