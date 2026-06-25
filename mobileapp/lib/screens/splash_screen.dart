import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';
import 'landing_page.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _barAnim;
  late Animation<double> _glitchAnim;
  int _currentStep = 0;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 3200),
      vsync: this,
    );
    _barAnim = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.linear),
    );
    _glitchAnim = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.linear),
    );

    _controller.addListener(() {
      final step = (_controller.value * 6).floor();
      if (step != _currentStep) {
        setState(() => _currentStep = step);
      }
    });

    _controller.forward();

    Timer(const Duration(seconds: 4), () {
      if (mounted) {
        Navigator.of(context).pushReplacement(
          PageRouteBuilder(
            pageBuilder: (context, animation, secondaryAnimation) =>
                const LandingPage(),
            transitionsBuilder: (context, animation, secondaryAnimation, child) =>
                FadeTransition(opacity: animation, child: child),
            transitionDuration: const Duration(milliseconds: 400),
          ),
        );
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
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
              // Decorative top bar
              Container(
                width: 80,
                height: 6,
                color: const Color(0xFF4A3728),
              ),
              const SizedBox(height: 24),

              // Logo with brutalist frame
              AnimatedBuilder(
                animation: _glitchAnim,
                builder: (context, child) {
                  return Transform.translate(
                    offset: Offset(
                      _glitchAnim.value > 0.3 && _glitchAnim.value < 0.35
                          ? 4
                          : _glitchAnim.value > 0.7 && _glitchAnim.value < 0.72
                              ? -3
                              : 0,
                      0,
                    ),
                    child: Container(
                      width: 180,
                      height: 180,
                      decoration: BoxDecoration(
                        border: Border.all(
                          color: const Color(0xFF4A3728),
                          width: 6,
                        ),
                        color: Colors.white,
                      ),
                      child: Stack(
                        children: [
                          Padding(
                            padding: const EdgeInsets.all(20),
                            child: Image.asset(
                              'assests/logo.png',
                              fit: BoxFit.contain,
                            ),
                          ),
                          // Brutalist corner crosses
                          Positioned(
                            top: -3,
                            left: -3,
                            child: _cornerCross(),
                          ),
                          Positioned(
                            top: -3,
                            right: -3,
                            child: _cornerCross(),
                          ),
                          Positioned(
                            bottom: -3,
                            left: -3,
                            child: _cornerCross(),
                          ),
                          Positioned(
                            bottom: -3,
                            right: -3,
                            child: _cornerCross(),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
              const SizedBox(height: 32),

              // Title with stutter effect
              AnimatedBuilder(
                animation: _glitchAnim,
                builder: (context, child) {
                  final glitch = _glitchAnim.value;
                  return Text(
                    glitch > 0.5 && glitch < 0.52
                        ? 'R BTA'
                        : glitch > 0.75 && glitch < 0.77
                            ? 'RA TA'
                            : 'RABTA',
                    style: const TextStyle(
                      fontSize: 68,
                      fontWeight: FontWeight.w900,
                      color: Color(0xFF4A3728),
                      letterSpacing: 14,
                      height: 1,
                    ),
                  );
                },
              ),
              const SizedBox(height: 8),
              Text(
                '/// INCIDENT MANAGEMENT',
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  color: const Color(0xFF6F4E37),
                  letterSpacing: 4,
                ),
              ),
              const SizedBox(height: 48),

              // Brutalist stuttering loading bar
              SizedBox(
                width: 300,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    AnimatedBuilder(
                      animation: _barAnim,
                      builder: (context, child) {
                        return Container(
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
                              final stepStart = i / 6;
                              final stepEnd = (i + 1) / 6;
                              final filled = _barAnim.value >= stepEnd;
                              final current = _barAnim.value >= stepStart &&
                                  _barAnim.value < stepEnd;
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
                        );
                      },
                    ),
                    const SizedBox(height: 12),
                    AnimatedBuilder(
                      animation: _barAnim,
                      builder: (context, child) {
                        final pct = (_barAnim.value * 100).toInt();
                        return Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'SYSTEM BOOT',
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.w700,
                                color: const Color(0xFF4A3728),
                                letterSpacing: 2,
                              ),
                            ),
                            Text(
                              '${pct.toString().padLeft(3, '0')}%',
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w900,
                                color: const Color(0xFF4A3728),
                                letterSpacing: 3,
                              ),
                            ),
                          ],
                        );
                      },
                    ),
                  ],
                ),
              ),

              const Spacer(),

              // Bottom text
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 16),
                decoration: const BoxDecoration(
                  border: Border(
                    top: BorderSide(color: Color(0xFF4A3728), width: 3),
                  ),
                ),
                child: Text(
                  'EST. 2026 /// v1.0',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    color: const Color(0xFF6F4E37),
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

  Widget _cornerCross() {
    return Transform.rotate(
      angle: pi / 4,
      child: Container(
        width: 16,
        height: 16,
        decoration: BoxDecoration(
          border: Border.all(color: const Color(0xFF4A3728), width: 3),
          color: const Color(0xFFFFF8F0),
        ),
      ),
    );
  }
}
