
import 'package:flutter/foundation.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

const isProduction = kDebugMode;
const isDevelopment = kReleaseMode;

class Environment {
  static String get fileName {
    if (isProduction) return '.env.production';
    if (isDevelopment) return '.env.development';
    throw Exception('Unknown environment');
  }

  static String get apiKey => dotenv.env['API_KEY'] ?? '';
}
