import 'package:shared_preferences/shared_preferences.dart';
import '../models/user_model.dart';
import 'api_service.dart';

class AuthService {
  static const String _tokenKey = 'auth_token';
  String? _token;
  UserModel? _currentUser;

  String? get token => _token;
  UserModel? get currentUser => _currentUser;
  bool get isAuthenticated => _token != null;

  Future<void> _saveToken(String token) async {
    _token = token;
    ApiService.setToken(token);
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_tokenKey, token);
  }

  Future<void> loadToken() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString(_tokenKey);
    ApiService.setToken(_token);
  }

  Future<void> clearToken() async {
    _token = null;
    _currentUser = null;
    ApiService.setToken(null);
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
  }

  Future<Map<String, dynamic>> signUp({
    required String email,
    required String password,
    required String name,
    required String phone,
  }) async {
    final data = await ApiService.post('/api/auth/register', {
      'email': email,
      'password': password,
      'name': name,
      'phone': phone,
    });
    return data;
  }

  Future<UserModel> verifyEmail({
    required String email,
    required String code,
  }) async {
    final data = await ApiService.post('/api/auth/verify-email', {
      'email': email,
      'code': code,
    });

    await _saveToken(data['token'] as String);
    _currentUser = UserModel.fromJson(data['user'] as Map<String, dynamic>);
    return _currentUser!;
  }

  Future<void> resendCode({required String email}) async {
    await ApiService.post('/api/auth/resend-code', {
      'email': email,
    });
  }

  Future<UserModel> signIn({
    required String email,
    required String password,
  }) async {
    final data = await ApiService.post('/api/auth/login', {
      'email': email,
      'password': password,
    });

    await _saveToken(data['token'] as String);
    _currentUser = UserModel.fromJson(data['user'] as Map<String, dynamic>);
    return _currentUser!;
  }

  Future<UserModel> getProfile() async {
    final data = await ApiService.get('/api/auth/profile');
    _currentUser = UserModel.fromJson(data['user'] as Map<String, dynamic>);
    return _currentUser!;
  }

  Future<UserModel> updateProfile({
    String? name,
    String? phone,
  }) async {
    final body = <String, dynamic>{};
    if (name != null) body['name'] = name;
    if (phone != null) body['phone'] = phone;

    final data = await ApiService.put('/api/auth/profile', body);
    _currentUser = UserModel.fromJson(data['user'] as Map<String, dynamic>);
    return _currentUser!;
  }

  Future<void> signOut() async {
    await clearToken();
  }
}
