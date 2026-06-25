import 'dart:async';
import 'package:flutter/material.dart';
import 'landing_page.dart' show LoginPage;

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _ctrl;
  late Animation<double> _bar;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
      duration: const Duration(milliseconds: 3000),
      vsync: this,
    );
    _bar = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _ctrl, curve: Curves.linear),
    );
    _ctrl.forward();

    Timer(const Duration(seconds: 4), () {
      if (mounted) {
        Navigator.of(context).pushReplacement(
          PageRouteBuilder(
            pageBuilder: (context, animation, secondary) =>
                const LoginPage(),
            transitionsBuilder: (context, animation, secondary, child) =>
                FadeTransition(opacity: animation, child: child),
            transitionDuration: const Duration(milliseconds: 400),
          ),
        );
      }
    });
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFFF8F0),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(width: 80, height: 6, color: const Color(0xFF4A3728)),
              const SizedBox(height: 32),

              // LOGO — big, bold, center stage
              Container(
                width: 200,
                height: 200,
                decoration: BoxDecoration(
                  border: Border.all(color: const Color(0xFF4A3728), width: 6),
                  color: Colors.white,
                ),
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Image.asset('assests/logo.png', fit: BoxFit.contain),
                ),
              ),
              const SizedBox(height: 28),

              const Text(
                'RABTA',
                style: TextStyle(
                  fontSize: 64,
                  fontWeight: FontWeight.w900,
                  color: Color(0xFF4A3728),
                  letterSpacing: 14,
                  height: 1,
                ),
              ),
              const SizedBox(height: 6),
              const Text(
                '/// INCIDENT MANAGEMENT',
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  color: Color(0xFF6F4E37),
                  letterSpacing: 4,
                ),
              ),
              const SizedBox(height: 48),

              // Loading bar
              AnimatedBuilder(
                animation: _bar,
                builder: (context, child) {
                  return SizedBox(
                    width: 300,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          width: 300,
                          height: 28,
                          decoration: BoxDecoration(
                            border: Border.all(
                              color: const Color(0xFF4A3728),
                              width: 4,
                            ),
                            color: Colors.white,
                          ),
                          child: Row(
                            children: List.generate(6, (i) {
                              final filled = _bar.value >= (i + 1) / 6;
                              final current = _bar.value >= i / 6 &&
                                  _bar.value < (i + 1) / 6;
                              return Expanded(
                                child: Container(
                                  decoration: BoxDecoration(
                                    color: filled
                                        ? const Color(0xFF4A3728)
                                        : current
                                            ? const Color(0xFF8B7355)
                                            : Colors.transparent,
                                    border: i < 5
                                        ? const Border(
                                            right: BorderSide(
                                              color: Color(0xFF4A3728),
                                              width: 3,
                                            ),
                                          )
                                        : null,
                                  ),
                                ),
                              );
                            }),
                          ),
                        ),
                        const SizedBox(height: 10),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text(
                              'SYSTEM BOOT',
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.w700,
                                color: Color(0xFF4A3728),
                                letterSpacing: 2,
                              ),
                            ),
                            Text(
                              '${(_bar.value * 100).toInt().toString().padLeft(3, '0')}%',
                              style: const TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w900,
                                color: Color(0xFF4A3728),
                                letterSpacing: 3,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  );
                },
              ),

              const Spacer(),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 16),
                decoration: const BoxDecoration(
                  border: Border(
                    top: BorderSide(color: Color(0xFF4A3728), width: 3),
                  ),
                ),
                child: const Text(
                  'EST. 2026 /// v1.0',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    color: Color(0xFF6F4E37),
                    letterSpacing: 3,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
