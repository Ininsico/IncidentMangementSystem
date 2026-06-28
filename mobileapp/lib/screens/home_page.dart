import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../constants/app_colors.dart';
import '../services/auth_service.dart';
import 'landing_page.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> with SingleTickerProviderStateMixin {
  final _auth = AuthService();
  String _name = '';
  String _email = '';
  bool _loading = true;
  int _currentTab = 0;
  late AnimationController _refreshController;

  final List<_IncidentItem> _mockIncidents = [
    _IncidentItem('Network outage in Block A', 'Infrastructure', 'In Progress', AppColors.warning, AppColors.warningLight),
    _IncidentItem('Server room temperature spike', 'Hardware', 'Open', AppColors.error, AppColors.errorLight),
    _IncidentItem('Email service restoration', 'IT Support', 'Resolved', AppColors.success, AppColors.successLight),
  ];

  @override
  void initState() {
    super.initState();
    _refreshController = AnimationController(vsync: this, duration: const Duration(milliseconds: 300));
    _load();
  }

  @override
  void dispose() {
    _refreshController.dispose();
    super.dispose();
  }

  Future<void> _load() async {
    try {
      final user = await _auth.getProfile();
      if (mounted) {
        setState(() {
          _name = user.name.isNotEmpty ? user.name : user.email.split('@').first;
          _email = user.email;
          _loading = false;
        });
      }
    } catch (_) {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      bottomNavigationBar: _buildBottomNav(),
      body: _loading
          ? const Center(child: CircularProgressIndicator(color: AppColors.primary))
          : IndexedStack(
              index: _currentTab,
              children: [
                _buildDashboard(),
                _buildIncidentsTab(),
                _buildProfileTab(),
              ],
            ),
    );
  }

  Widget _buildBottomNav() {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.surface,
        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(0.06), blurRadius: 16, offset: const Offset(0, -4)),
        ],
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _navItem(0, Icons.dashboard_rounded, 'Dashboard'),
              _navItem(1, Icons.assignment_rounded, 'Incidents'),
              _navItem(2, Icons.person_outline_rounded, 'Profile'),
            ],
          ),
        ),
      ),
    );
  }

  Widget _navItem(int index, IconData icon, String label) {
    final active = _currentTab == index;
    return GestureDetector(
      onTap: () => setState(() => _currentTab = index),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: active ? AppColors.primary.withOpacity(0.08) : Colors.transparent,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 20, color: active ? AppColors.primary : AppColors.textTertiary),
            if (active) ...[
              const SizedBox(width: 6),
              Text(
                label,
                style: GoogleFonts.dmSans(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: AppColors.primary,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildDashboard() {
    return RefreshIndicator(
      color: AppColors.primary,
      onRefresh: _load,
      child: SingleChildScrollView(
        physics: const AlwaysScrollableScrollPhysics(),
        child: Column(
          children: [
            _buildHeader(),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildGreetingCard(),
                  const SizedBox(height: 24),
                  Text('OVERVIEW', style: GoogleFonts.dmSans(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.textSecondary, letterSpacing: 2)),
                  const SizedBox(height: 14),
                  _buildStatGrid(),
                  const SizedBox(height: 28),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('RECENT INCIDENTS', style: GoogleFonts.dmSans(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.textSecondary, letterSpacing: 2)),
                      Text('View all', style: GoogleFonts.dmSans(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.accentDark)),
                    ],
                  ),
                  const SizedBox(height: 14),
                  ..._mockIncidents.map((incident) => _buildIncidentRow(incident)),
                  const SizedBox(height: 24),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.only(top: 48, bottom: 24),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: AppColors.heroGradient,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('RABTA', style: GoogleFonts.sora(fontSize: 18, fontWeight: FontWeight.w700, color: AppColors.textOnDark, letterSpacing: 4)),
                const SizedBox(height: 2),
                Text('Dashboard', style: GoogleFonts.dmSans(fontSize: 12, color: AppColors.textOnDark.withOpacity(0.5), letterSpacing: 1)),
              ],
            ),
            GestureDetector(
              onTap: () async {
                await _auth.signOut();
                if (context.mounted) {
                  Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (_) => const LoginPage()));
                }
              },
              child: Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(Icons.logout_rounded, size: 20, color: AppColors.textOnDark),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildGreetingCard() {
    return Container(
      margin: const EdgeInsets.only(top: -16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppColors.primaryLight, AppColors.primary],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(color: AppColors.primary.withOpacity(0.25), blurRadius: 16, offset: const Offset(0, 6)),
        ],
      ),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.15),
              borderRadius: BorderRadius.circular(14),
            ),
            child: Center(
              child: Text(
                _name[0].toUpperCase(),
                style: GoogleFonts.sora(fontSize: 20, fontWeight: FontWeight.w700, color: AppColors.textOnDark),
              ),
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Good to see you,', style: GoogleFonts.dmSans(fontSize: 12, color: AppColors.textOnDark.withOpacity(0.6))),
                const SizedBox(height: 2),
                Text(_name, style: GoogleFonts.sora(fontSize: 18, fontWeight: FontWeight.w700, color: AppColors.textOnDark)),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: AppColors.success.withOpacity(0.2),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.check_circle, size: 12, color: AppColors.success),
                const SizedBox(width: 4),
                Text('Verified', style: GoogleFonts.dmSans(fontSize: 10, fontWeight: FontWeight.w600, color: AppColors.success)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatGrid() {
    return Column(
      children: [
        Row(
          children: [
            Expanded(child: _StatCard(label: 'Total Incidents', value: '0', icon: Icons.assignment_rounded, colors: AppColors.statBlue)),
            const SizedBox(width: 12),
            Expanded(child: _StatCard(label: 'Open', value: '0', icon: Icons.radio_button_unchecked_rounded, colors: AppColors.statRed)),
          ],
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(child: _StatCard(label: 'In Progress', value: '0', icon: Icons.timelapse_rounded, colors: AppColors.statGold)),
            const SizedBox(width: 12),
            Expanded(child: _StatCard(label: 'Resolved', value: '0', icon: Icons.check_circle_rounded, colors: AppColors.statGreen)),
          ],
        ),
      ],
    );
  }

  Widget _buildIncidentRow(_IncidentItem item) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.borderLight, width: 1),
      ),
      child: Row(
        children: [
          Container(
            width: 4,
            height: 40,
            decoration: BoxDecoration(
              color: item.statusColor,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(item.title, style: GoogleFonts.dmSans(fontSize: 14, fontWeight: FontWeight.w600, color: AppColors.textPrimary)),
                const SizedBox(height: 4),
                Text(item.category, style: GoogleFonts.dmSans(fontSize: 12, color: AppColors.textSecondary)),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: item.badgeColor,
              borderRadius: BorderRadius.circular(6),
            ),
            child: Text(item.status, style: GoogleFonts.dmSans(fontSize: 11, fontWeight: FontWeight.w600, color: item.statusColor)),
          ),
        ],
      ),
    );
  }

  Widget _buildIncidentsTab() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.inventory_2_outlined, size: 56, color: AppColors.border),
            const SizedBox(height: 16),
            Text('All Incidents', style: GoogleFonts.sora(fontSize: 20, fontWeight: FontWeight.w700, color: AppColors.textPrimary)),
            const SizedBox(height: 8),
            Text('Full incident list coming soon', style: GoogleFonts.dmSans(fontSize: 14, color: AppColors.textSecondary)),
          ],
        ),
      ),
    );
  }

  Widget _buildProfileTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(20, 60, 20, 24),
      child: Column(
        children: [
          Container(
            width: 80,
            height: 80,
            decoration: BoxDecoration(
              gradient: const LinearGradient(colors: [AppColors.primaryLight, AppColors.primary], begin: Alignment.topLeft, end: Alignment.bottomRight),
              borderRadius: BorderRadius.circular(24),
            ),
            child: Center(
              child: Text(_name[0].toUpperCase(), style: GoogleFonts.sora(fontSize: 32, fontWeight: FontWeight.w700, color: AppColors.textOnDark)),
            ),
          ),
          const SizedBox(height: 16),
          Text(_name, style: GoogleFonts.sora(fontSize: 22, fontWeight: FontWeight.w700, color: AppColors.textPrimary)),
          const SizedBox(height: 4),
          Text(_email, style: GoogleFonts.dmSans(fontSize: 14, color: AppColors.textSecondary)),
          const SizedBox(height: 32),
          _profileTile(Icons.person_outline_rounded, 'Full Name', _name),
          _profileTile(Icons.email_outlined, 'Email', _email),
          _profileTile(Icons.verified_outlined, 'Status', 'Verified'),
          const SizedBox(height: 32),
          GestureDetector(
            onTap: () async {
              await _auth.signOut();
              if (context.mounted) {
                Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (_) => const LoginPage()));
              }
            },
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 14),
              decoration: BoxDecoration(
                color: AppColors.errorLight,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Center(
                child: Text('Sign Out', style: GoogleFonts.dmSans(fontSize: 15, fontWeight: FontWeight.w600, color: AppColors.error)),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _profileTile(IconData icon, String label, String value) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.borderLight, width: 1),
      ),
      child: Row(
        children: [
          Icon(icon, size: 20, color: AppColors.textSecondary),
          const SizedBox(width: 12),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(label, style: GoogleFonts.dmSans(fontSize: 12, color: AppColors.textSecondary)),
              const SizedBox(height: 2),
              Text(value, style: GoogleFonts.dmSans(fontSize: 15, fontWeight: FontWeight.w600, color: AppColors.textPrimary)),
            ],
          ),
        ],
      ),
    );
  }
}

class _IncidentItem {
  final String title;
  final String category;
  final String status;
  final Color statusColor;
  final Color badgeColor;

  _IncidentItem(this.title, this.category, this.status, this.statusColor, this.badgeColor);
}

class _StatCard extends StatelessWidget {
  final String label;
  final String value;
  final IconData icon;
  final List<Color> colors;

  const _StatCard({required this.label, required this.value, required this.icon, required this.colors});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        gradient: LinearGradient(colors: colors, begin: Alignment.topLeft, end: Alignment.bottomRight),
        borderRadius: BorderRadius.circular(14),
        boxShadow: [
          BoxShadow(color: colors[0].withOpacity(0.25), blurRadius: 12, offset: const Offset(0, 4)),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, size: 16, color: AppColors.textOnDark.withOpacity(0.8)),
              const SizedBox(width: 6),
              Expanded(
                child: Text(label, style: GoogleFonts.dmSans(fontSize: 11, fontWeight: FontWeight.w600, color: AppColors.textOnDark.withOpacity(0.7)), overflow: TextOverflow.ellipsis),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(value, style: GoogleFonts.sora(fontSize: 32, fontWeight: FontWeight.w700, color: AppColors.textOnDark)),
        ],
      ),
    );
  }
}
