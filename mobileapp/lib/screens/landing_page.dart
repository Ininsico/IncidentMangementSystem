import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../constants/app_colors.dart';
import '../services/auth_service.dart';
import '../services/api_service.dart';
import 'home_page.dart';
import 'verification_screen.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> with SingleTickerProviderStateMixin {
  final _auth = AuthService();
  bool _isSignUp = false;
  bool _loading = false;
  String? _error;
  late AnimationController _slideController;
  late Animation<Offset> _slideAnimation;
  late Animation<double> _fadeAnimation;

  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _nameController = TextEditingController();
  final _phoneController = TextEditingController();
  final _confirmController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _slideController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 600),
    );
    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.08),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _slideController, curve: Curves.easeOutCubic));
    _fadeAnimation = Tween<double>(
      begin: 0,
      end: 1,
    ).animate(CurvedAnimation(parent: _slideController, curve: Curves.easeOut));
    _slideController.forward();
  }

  @override
  void dispose() {
    _slideController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _nameController.dispose();
    _phoneController.dispose();
    _confirmController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    setState(() { _loading = true; _error = null; });

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
          Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (_) => VerificationScreen(email: result['email'] as String)),
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
        if (mounted) {
          Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (_) => VerificationScreen(email: err.data!['email'] as String)),
          );
        }
        return;
      }
      setState(() { _error = err.toString().replaceFirst('Exception: ', ''); });
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  void _toggleMode() {
    setState(() { _isSignUp = !_isSignUp; _error = null; });
    _slideController.reset();
    _slideController.forward();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final heroHeight = size.height * 0.32;

    return Scaffold(
      body: Column(
        children: [
          Container(
            height: heroHeight,
            width: double.infinity,
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: AppColors.heroGradient,
              ),
            ),
            child: SafeArea(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Spacer(),
                  Hero(
                    tag: 'app_logo',
                    child: Container(
                      width: 72,
                      height: 72,
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.12),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Image.asset('assets/logo.png', width: 44, height: 44),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'RABTA',
                    style: GoogleFonts.sora(
                      fontSize: 26,
                      fontWeight: FontWeight.w700,
                      color: AppColors.textOnDark,
                      letterSpacing: 10,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Incident Management',
                    style: GoogleFonts.dmSans(
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                      color: AppColors.textOnDark.withOpacity(0.6),
                      letterSpacing: 2.5,
                    ),
                  ),
                  const Spacer(),
                  Container(
                    height: 4,
                    width: 40,
                    decoration: BoxDecoration(
                      color: AppColors.accent.withOpacity(0.5),
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                  const SizedBox(height: 16),
                ],
              ),
            ),
          ),
          Expanded(
            child: Container(
              decoration: const BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(28),
                  topRight: Radius.circular(28),
                ),
              ),
              child: SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(24, 28, 24, 32),
                  child: SlideTransition(
                    position: _slideAnimation,
                    child: FadeTransition(
                      opacity: _fadeAnimation,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            _isSignUp ? 'Create Account' : 'Welcome Back',
                            style: GoogleFonts.sora(
                              fontSize: 20,
                              fontWeight: FontWeight.w700,
                              color: AppColors.textPrimary,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            _isSignUp ? 'Enter your details to get started' : 'Sign in to your account to continue',
                            style: GoogleFonts.dmSans(
                              fontSize: 14,
                              color: AppColors.textSecondary,
                            ),
                          ),
                          const SizedBox(height: 28),
                          _buildField(
                            label: 'Email',
                            hint: 'you@example.com',
                            controller: _emailController,
                            type: TextInputType.emailAddress,
                            icon: Icons.email_outlined,
                          ),
                          const SizedBox(height: 16),
                          _buildField(
                            label: 'Password',
                            hint: 'Enter your password',
                            controller: _passwordController,
                            obscure: true,
                            icon: Icons.lock_outlined,
                          ),
                          if (!_isSignUp) ...[
                            const SizedBox(height: 6),
                            Align(
                              alignment: Alignment.centerRight,
                              child: TextButton(
                                onPressed: () {},
                                style: TextButton.styleFrom(padding: const EdgeInsets.symmetric(vertical: 4, horizontal: 4)),
                                child: Text(
                                  'Forgot password?',
                                  style: GoogleFonts.dmSans(
                                    fontSize: 13,
                                    fontWeight: FontWeight.w600,
                                    color: AppColors.accentDark,
                                  ),
                                ),
                              ),
                            ),
                          ],
                          AnimatedCrossFade(
                            duration: const Duration(milliseconds: 300),
                            crossFadeState: _isSignUp ? CrossFadeState.showSecond : CrossFadeState.showFirst,
                            firstChild: const SizedBox.shrink(),
                            secondChild: Column(
                              children: [
                                _buildField(
                                  label: 'Full Name',
                                  hint: 'Ahmed Khan',
                                  controller: _nameController,
                                  icon: Icons.person_outlined,
                                ),
                                const SizedBox(height: 16),
                                _buildField(
                                  label: 'Phone',
                                  hint: '+92 300 1234567',
                                  controller: _phoneController,
                                  type: TextInputType.phone,
                                  icon: Icons.phone_outlined,
                                ),
                                const SizedBox(height: 16),
                                _buildField(
                                  label: 'Confirm Password',
                                  hint: 'Re-enter password',
                                  controller: _confirmController,
                                  obscure: true,
                                  icon: Icons.lock_outlined,
                                ),
                              ],
                            ),
                          ),
                          if (_error != null) ...[
                            const SizedBox(height: 14),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                              decoration: BoxDecoration(
                                color: AppColors.errorLight,
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Row(
                                children: [
                                  const Icon(Icons.error_outline, size: 16, color: AppColors.error),
                                  const SizedBox(width: 8),
                                  Expanded(
                                    child: Text(
                                      _error!,
                                      style: GoogleFonts.dmSans(
                                        fontSize: 13,
                                        fontWeight: FontWeight.w500,
                                        color: AppColors.error,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                          const SizedBox(height: 22),
                          GestureDetector(
                            onTap: _loading ? null : _submit,
                            child: Container(
                              width: double.infinity,
                              height: 52,
                              decoration: BoxDecoration(
                                gradient: const LinearGradient(
                                  colors: [AppColors.primary, AppColors.primaryLight],
                                  begin: Alignment.topLeft,
                                  end: Alignment.bottomRight,
                                ),
                                borderRadius: BorderRadius.circular(12),
                                boxShadow: [
                                  BoxShadow(
                                    color: AppColors.primary.withOpacity(0.3),
                                    blurRadius: 12,
                                    offset: const Offset(0, 4),
                                  ),
                                ],
                              ),
                              child: Center(
                                child: _loading
                                    ? const SizedBox(
                                        width: 22,
                                        height: 22,
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
                          const SizedBox(height: 18),
                          Center(
                            child: GestureDetector(
                              onTap: _loading ? null : _toggleMode,
                              child: RichText(
                                text: TextSpan(
                                  style: GoogleFonts.dmSans(fontSize: 14, color: AppColors.textSecondary),
                                  children: [
                                    TextSpan(text: _isSignUp ? 'Already have an account? ' : "Don't have an account? "),
                                    TextSpan(
                                      text: _isSignUp ? 'Login' : 'Sign Up',
                                      style: GoogleFonts.dmSans(
                                        fontSize: 14,
                                        fontWeight: FontWeight.w700,
                                        color: AppColors.accentDark,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(height: 8),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildField({
    required String label,
    required String hint,
    required TextEditingController controller,
    bool obscure = false,
    TextInputType? type,
    IconData? icon,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 2, bottom: 6),
          child: Text(
            label,
            style: GoogleFonts.dmSans(
              fontSize: 13,
              fontWeight: FontWeight.w600,
              color: AppColors.textPrimary,
            ),
          ),
        ),
        Container(
          decoration: BoxDecoration(
            color: AppColors.inputFill,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: AppColors.borderLight, width: 1.5),
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
                color: AppColors.textTertiary,
              ),
              border: InputBorder.none,
              focusedBorder: InputBorder.none,
              prefixIcon: icon != null ? Icon(icon, size: 20, color: AppColors.textTertiary) : null,
            ),
          ),
        ),
      ],
    );
  }
}
