import 'package:flutter/material.dart';

class SignupPage extends StatelessWidget {
  const SignupPage({super.key});

  static Route route() {
    return PageRouteBuilder(
      pageBuilder: (context, animation, secondary) => const SignupPage(),
      transitionsBuilder: (context, animation, secondary, child) {
        return SlideTransition(
          position: Tween<Offset>(
            begin: const Offset(1, 0),
            end: Offset.zero,
          ).animate(CurvedAnimation(
            parent: animation,
            curve: Curves.easeOutCubic,
            reverseCurve: Curves.easeInCubic,
          )),
          child: child,
        );
      },
      transitionDuration: const Duration(milliseconds: 350),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFFF8F0),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        automaticallyImplyLeading: false,
        title: const Text(
          'CREATE ACCOUNT',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w900,
            color: Color(0xFF4A3728),
            letterSpacing: 4,
          ),
        ),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(
            color: const Color(0xFF4A3728),
            height: 3,
          ),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 28),
          child: Column(
            children: [
              const SizedBox(height: 40),
              Image.asset('assets/logo.png', width: 100, height: 100),
              const SizedBox(height: 32),
              _buildField(
                label: 'FULL NAME',
                hint: 'Ahmed Khan',
              ),
              const SizedBox(height: 20),
              _buildField(
                label: 'EMAIL ADDRESS',
                hint: 'ahmed@example.com',
                keyboardType: TextInputType.emailAddress,
              ),
              const SizedBox(height: 20),
              _buildField(
                label: 'PHONE NUMBER',
                hint: '+92 300 1234567',
                keyboardType: TextInputType.phone,
              ),
              const SizedBox(height: 20),
              _buildField(
                label: 'PASSWORD',
                hint: '••••••••',
                obscure: true,
              ),
              const SizedBox(height: 20),
              _buildField(
                label: 'CONFIRM PASSWORD',
                hint: '••••••••',
                obscure: true,
              ),
              const SizedBox(height: 24),
              Container(
                width: double.infinity,
                height: 60,
                decoration: BoxDecoration(
                  border: Border.all(color: const Color(0xFF4A3728), width: 4),
                  color: const Color(0xFF4A3728),
                ),
                child: const Center(
                  child: Text(
                    'REGISTER',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w900,
                      color: Colors.white,
                      letterSpacing: 10,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Container(
                width: double.infinity,
                height: 60,
                decoration: BoxDecoration(
                  border: Border.all(color: const Color(0xFF4A3728), width: 4),
                  color: Colors.white,
                ),
                child: Center(
                  child: TextButton(
                    onPressed: () => Navigator.of(context).pop(),
                    style: TextButton.styleFrom(
                      padding: EdgeInsets.zero,
                      minimumSize: const Size(double.infinity, 60),
                      shape: const RoundedRectangleBorder(),
                    ),
                    child: const Text(
                      'BACK TO LOGIN',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w900,
                        color: Color(0xFF4A3728),
                        letterSpacing: 10,
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 36),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildField({
    required String label,
    required String hint,
    bool obscure = false,
    TextInputType? keyboardType,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 2, bottom: 8),
          child: Text(
            label,
            style: const TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w900,
              color: Color(0xFF4A3728),
              letterSpacing: 3,
            ),
          ),
        ),
        Container(
          decoration: BoxDecoration(
            border: Border.all(color: const Color(0xFF4A3728), width: 4),
            color: Colors.white,
          ),
          child: TextField(
            obscureText: obscure,
            keyboardType: keyboardType,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: Color(0xFF2C1810),
            ),
            decoration: InputDecoration(
              contentPadding: const EdgeInsets.symmetric(
                horizontal: 16,
                vertical: 18,
              ),
              hintText: hint,
              hintStyle: const TextStyle(
                color: Color(0xFFB8A088),
                fontWeight: FontWeight.w500,
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
