import 'package:flutter/material.dart';

class SignupPage extends StatefulWidget {
  const SignupPage({super.key});

  static Route route() {
    return PageRouteBuilder(
      pageBuilder: (context, animation, secondary) => const SignupPage(),
      transitionsBuilder: (context, animation, secondary, child) {
        return FadeTransition(opacity: animation, child: child);
      },
      transitionDuration: const Duration(milliseconds: 300),
    );
  }

  @override
  State<SignupPage> createState() => _SignupPageState();
}

class _SignupPageState extends State<SignupPage> {
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmController = TextEditingController();

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _passwordController.dispose();
    _confirmController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8F6F3),
      resizeToAvoidBottomInset: false,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            children: [
              const Spacer(flex: 1),
              Image.asset('assets/logo.png', width: 72, height: 72),
              const SizedBox(height: 4),
              const Text(
                'Create Account',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w700,
                  color: Color(0xFF2C1810),
                ),
              ),
              const Spacer(flex: 1),
              _buildField(label: 'Full Name', hint: 'Ahmed Khan', controller: _nameController),
              const SizedBox(height: 10),
              _buildField(label: 'Email', hint: 'ahmed@example.com', controller: _emailController, type: TextInputType.emailAddress),
              const SizedBox(height: 10),
              _buildField(label: 'Phone', hint: '+92 300 1234567', controller: _phoneController, type: TextInputType.phone),
              const SizedBox(height: 10),
              _buildField(label: 'Password', hint: 'Create password', controller: _passwordController, obscure: true),
              const SizedBox(height: 10),
              _buildField(label: 'Confirm Password', hint: 'Re-enter password', controller: _confirmController, obscure: true),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                height: 48,
                child: ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF4A3728),
                    foregroundColor: Colors.white,
                    elevation: 0,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: const Text('Register', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600, letterSpacing: 1)),
                ),
              ),
              const SizedBox(height: 10),
              SizedBox(
                width: double.infinity,
                height: 48,
                child: OutlinedButton(
                  onPressed: () => Navigator.of(context).pop(),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: const Color(0xFF4A3728),
                    side: const BorderSide(color: Color(0xFF4A3728), width: 1.5),
                    elevation: 0,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: const Text('Back to Login', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600, letterSpacing: 1)),
                ),
              ),
              const Spacer(flex: 1),
            ],
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
          padding: const EdgeInsets.only(left: 2, bottom: 4),
          child: Text(
            label,
            style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: Color(0xFF8B7355), letterSpacing: 1),
          ),
        ),
        Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(10),
            boxShadow: [
              BoxShadow(color: Colors.black.withValues(alpha: 0.04), blurRadius: 6, offset: const Offset(0, 1)),
            ],
          ),
          child: TextField(
            controller: controller,
            obscureText: obscure,
            keyboardType: type,
            style: const TextStyle(fontSize: 14, color: Color(0xFF2C1810)),
            decoration: InputDecoration(
              contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
              hintText: hint,
              hintStyle: TextStyle(color: const Color(0xFFB8A088), fontSize: 14),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: BorderSide.none,
              ),
              filled: true,
              fillColor: Colors.white,
            ),
          ),
        ),
      ],
    );
  }
}
