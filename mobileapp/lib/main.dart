import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'screens/splash_screen.dart';

void main() {
  runApp(const RabtaApp());
}

class RabtaApp extends StatelessWidget {
  const RabtaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'RABTA',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF4A3728),
          primary: const Color(0xFF4A3728),
          surface: const Color(0xFFFFF8F0),
        ),
        scaffoldBackgroundColor: const Color(0xFFF8F6F3),
        useMaterial3: true,
        textTheme: GoogleFonts.plusJakartaSansTextTheme(),
      ),
      home: const SplashScreen(),
    );
  }
}
