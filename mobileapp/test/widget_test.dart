import 'package:flutter_test/flutter_test.dart';
import 'package:mobileapp/main.dart';

void main() {
  testWidgets('App loads splash screen', (WidgetTester tester) async {
    await tester.pumpWidget(const RabtaApp());
    expect(find.text('RABTA'), findsOneWidget);
    expect(find.text('Incident Management'), findsOneWidget);
  });
}
