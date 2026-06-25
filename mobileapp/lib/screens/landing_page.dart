import 'package:flutter/material.dart';

class LandingPage extends StatelessWidget {
  const LandingPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFFF8F0),
      body: SafeArea(
        child: Column(
          children: [
            _BrutalistHeader(),
            Expanded(
              child: SingleChildScrollView(
                physics: const BouncingScrollPhysics(),
                child: Column(
                  children: [
                    _HeroSection(),
                    const SizedBox(height: 24),
                    const Padding(
                      padding: EdgeInsets.symmetric(horizontal: 20),
                      child: _SectionDivider(),
                    ),
                    const SizedBox(height: 24),
                    const Padding(
                      padding: EdgeInsets.symmetric(horizontal: 20),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _SectionLabel(label: 'CAPABILITIES'),
                          SizedBox(height: 16),
                          _BrutalistCard(
                            number: '01',
                            title: 'REPORT',
                            description:
                                'File incident reports in real-time with precision and speed. No bullshit.',
                          ),
                          SizedBox(height: 12),
                          _BrutalistCard(
                            number: '02',
                            title: 'TRACK',
                            description:
                                'Monitor incident status with live updates. Full transparency. Always.',
                          ),
                          SizedBox(height: 12),
                          _BrutalistCard(
                            number: '03',
                            title: 'RESOLVE',
                            description:
                                'Coordinate response teams and close incidents. Efficient. Effective.',
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 24),
                    const Padding(
                      padding: EdgeInsets.symmetric(horizontal: 20),
                      child: _SectionDivider(),
                    ),
                    const SizedBox(height: 24),
                    const Padding(
                      padding: EdgeInsets.symmetric(horizontal: 20),
                      child: _StatsSection(),
                    ),
                    const SizedBox(height: 24),
                    const Padding(
                      padding: EdgeInsets.symmetric(horizontal: 20),
                      child: _SectionDivider(),
                    ),
                    const SizedBox(height: 24),
                    const Padding(
                      padding: EdgeInsets.symmetric(horizontal: 20),
                      child: _CtaSection(),
                    ),
                    const SizedBox(height: 24),
                    const _Footer(),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _BrutalistHeader extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(color: Color(0xFF4A3728), width: 4),
        ),
        color: Colors.white,
      ),
      child: Row(
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              border: Border.all(color: const Color(0xFF4A3728), width: 3),
            ),
            child: Padding(
              padding: const EdgeInsets.all(6),
              child: Image.asset('assests/logo.png', fit: BoxFit.contain),
            ),
          ),
          const SizedBox(width: 14),
          const Text(
            'RABTA',
            style: TextStyle(
              fontSize: 26,
              fontWeight: FontWeight.w900,
              color: Color(0xFF4A3728),
              letterSpacing: 6,
            ),
          ),
          const Spacer(),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              border: Border.all(color: const Color(0xFF4A3728), width: 3),
            ),
            child: const Text(
              'MENU',
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w900,
                color: Color(0xFF4A3728),
                letterSpacing: 3,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _HeroSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 24, 20, 0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Decorative element
          Row(
            children: [
              Container(
                width: 40,
                height: 5,
                color: const Color(0xFF4A3728),
              ),
              const SizedBox(width: 12),
              Container(
                width: 120,
                height: 5,
                color: const Color(0xFF6F4E37),
              ),
            ],
          ),
          const SizedBox(height: 16),

          // Main headline
          const Text(
            'WELCOME TO\nTHE FUTURE OF\nINCIDENT CONTROL',
            style: TextStyle(
              fontSize: 36,
              fontWeight: FontWeight.w900,
              color: Color(0xFF2C1810),
              letterSpacing: 2,
              height: 1.1,
            ),
          ),
          const SizedBox(height: 16),

          // Sub headline
          const Text(
            'RABTA is the platform that puts you in command.\nReport. Track. Resolve. Take control.',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: Color(0xFF6F4E37),
              height: 1.6,
              letterSpacing: 0.5,
            ),
          ),
          const SizedBox(height: 20),

          // Hero image box with logo
          Container(
            width: double.infinity,
            height: 200,
            decoration: BoxDecoration(
              border: Border.all(color: const Color(0xFF4A3728), width: 5),
              color: const Color(0xFF4A3728),
            ),
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    width: 80,
                    height: 80,
                    decoration: const BoxDecoration(
                      color: Colors.white,
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(12),
                      child: Image.asset(
                        'assests/logo.png',
                        fit: BoxFit.contain,
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'RABTA',
                    style: TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.w900,
                      color: Colors.white,
                      letterSpacing: 8,
                    ),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'INCIDENT MANAGEMENT',
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                      color: Color(0xFFD4B896),
                      letterSpacing: 4,
                    ),
                  ),
                ],
              ),
            ),
          ),

          const SizedBox(height: 20),

          // Quick stats raw style
          Row(
            children: [
              _MiniStat(label: 'ACTIVE', value: '24/7'),
              const SizedBox(width: 8),
              _MiniStat(label: 'REPORTS', value: '1.2K+'),
              const SizedBox(width: 8),
              _MiniStat(label: 'USERS', value: '500+'),
            ],
          ),
        ],
      ),
    );
  }
}

class _MiniStat extends StatelessWidget {
  final String label;
  final String value;

  const _MiniStat({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12),
        decoration: BoxDecoration(
          border: Border.all(color: const Color(0xFF4A3728), width: 3),
          color: Colors.white,
        ),
        child: Column(
          children: [
            Text(
              value,
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w900,
                color: Color(0xFF4A3728),
              ),
            ),
            const SizedBox(height: 2),
            Text(
              label,
              style: const TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.w700,
                color: Color(0xFF6F4E37),
                letterSpacing: 2,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SectionDivider extends StatelessWidget {
  const _SectionDivider();

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 4,
      decoration: const BoxDecoration(
        color: Color(0xFF4A3728),
      ),
    );
  }
}

class _SectionLabel extends StatelessWidget {
  final String label;
  const _SectionLabel({required this.label});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
          decoration: const BoxDecoration(
            color: Color(0xFF4A3728),
          ),
          child: Text(
            label,
            style: const TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w900,
              color: Colors.white,
              letterSpacing: 3,
            ),
          ),
        ),
        const SizedBox(width: 8),
        const Expanded(
          child: _SectionDivider(),
        ),
      ],
    );
  }
}

class _BrutalistCard extends StatelessWidget {
  final String number;
  final String title;
  final String description;

  const _BrutalistCard({
    required this.number,
    required this.title,
    required this.description,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        border: Border.all(color: const Color(0xFF4A3728), width: 4),
        color: Colors.white,
      ),
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Number block
            Container(
              width: 60,
              padding: const EdgeInsets.symmetric(vertical: 16),
              decoration: const BoxDecoration(
                border: Border(
                  right: BorderSide(color: Color(0xFF4A3728), width: 4),
                ),
                color: Color(0xFF4A3728),
              ),
              child: Text(
                number,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w900,
                  color: Colors.white,
                ),
              ),
            ),
            // Content
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(14),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w900,
                        color: Color(0xFF4A3728),
                        letterSpacing: 4,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      description,
                      style: const TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w500,
                        color: Color(0xFF6F4E37),
                        height: 1.5,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _StatsSection extends StatelessWidget {
  const _StatsSection();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        border: Border.all(color: const Color(0xFF4A3728), width: 4),
        color: const Color(0xFF4A3728),
      ),
      child: Column(
        children: [
          const Text(
            'BY THE NUMBERS',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w900,
              color: Color(0xFFD4B896),
              letterSpacing: 4,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              _StatItem(value: '99.9%', label: 'UPTIME'),
              _StatDivider(),
              _StatItem(value: '<2s', label: 'RESPONSE'),
              _StatDivider(),
              _StatItem(value: '10K+', label: 'INCIDENTS'),
            ],
          ),
        ],
      ),
    );
  }
}

class _StatItem extends StatelessWidget {
  final String value;
  final String label;

  const _StatItem({required this.value, required this.label});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(
        children: [
          Text(
            value,
            style: const TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.w900,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: const TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w700,
              color: Color(0xFFD4B896),
              letterSpacing: 3,
            ),
          ),
        ],
      ),
    );
  }
}

class _StatDivider extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 3,
      height: 40,
      color: const Color(0xFFD4B896),
    );
  }
}

class _CtaSection extends StatelessWidget {
  const _CtaSection();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        border: Border.all(color: const Color(0xFF4A3728), width: 4),
        color: Colors.white,
      ),
      child: Column(
        children: [
          const Text(
            'READY TO TAKE CONTROL?',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w900,
              color: Color(0xFF4A3728),
              letterSpacing: 3,
            ),
          ),
          const SizedBox(height: 4),
          const Text(
            'Stop fucking around. Start managing.',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              color: Color(0xFF6F4E37),
              letterSpacing: 1,
            ),
          ),
          const SizedBox(height: 16),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(vertical: 16),
            decoration: BoxDecoration(
              border: Border.all(color: const Color(0xFF4A3728), width: 4),
              color: const Color(0xFF4A3728),
            ),
            child: const Text(
              'GET STARTED',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w900,
                color: Colors.white,
                letterSpacing: 6,
              ),
            ),
          ),
          const SizedBox(height: 12),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(vertical: 16),
            decoration: BoxDecoration(
              border: Border.all(color: const Color(0xFF4A3728), width: 4),
              color: Colors.white,
            ),
            child: const Text(
              'LEARN MORE',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w900,
                color: Color(0xFF4A3728),
                letterSpacing: 6,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _Footer extends StatelessWidget {
  const _Footer();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 20),
      decoration: const BoxDecoration(
        border: Border(
          top: BorderSide(color: Color(0xFF4A3728), width: 4),
        ),
        color: Color(0xFF2C1810),
      ),
      child: Column(
        children: [
          const Text(
            'RABTA',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w900,
              color: Colors.white,
              letterSpacing: 6,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'INCIDENT MANAGEMENT SYSTEM',
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w700,
              color: const Color(0xFFD4B896),
              letterSpacing: 4,
            ),
          ),
          const SizedBox(height: 16),
          Container(
            width: 40,
            height: 3,
            color: const Color(0xFFD4B896),
          ),
          const SizedBox(height: 16),
          const Text(
            '© 2026 RABTA — ALL RIGHTS RESERVED',
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w700,
              color: Color(0xFF8B7355),
              letterSpacing: 2,
            ),
          ),
        ],
      ),
    );
  }
}
