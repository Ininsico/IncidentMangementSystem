class UserModel {
  final String uid;
  final String email;
  final String name;
  final String phone;
  final bool verified;
  final String? createdAt;
  final String? updatedAt;

  UserModel({
    required this.uid,
    required this.email,
    this.name = '',
    this.phone = '',
    this.verified = false,
    this.createdAt,
    this.updatedAt,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      uid: json['_id'] as String? ?? '',
      email: json['email'] as String? ?? '',
      name: json['name'] as String? ?? '',
      phone: json['phone'] as String? ?? '',
      verified: json['verified'] as bool? ?? false,
      createdAt: json['createdAt'] as String?,
      updatedAt: json['updatedAt'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': uid,
      'email': email,
      'name': name,
      'phone': phone,
      'verified': verified,
    };
  }
}
