function validate(schema) {
  return (req, res, next) => {
    const errors = [];

    for (const [field, rules] of Object.entries(schema)) {
      const value = req.body[field];

      for (const rule of rules) {
        if (rule === 'required' && (!value || (typeof value === 'string' && !value.trim()))) {
          errors.push(`${field} is required`);
          break;
        }
        if (rule === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.push(`${field} must be a valid email`);
          break;
        }
        if (rule === 'password' && value && value.length < 6) {
          errors.push(`${field} must be at least 6 characters`);
          break;
        }
        if (rule === 'phone' && value && !/^\+?\d{7,15}$/.test(value.replace(/[\s-]/g, ''))) {
          errors.push(`${field} must be a valid phone number`);
          break;
        }
        if (rule === 'name' && value && value.trim().length < 2) {
          errors.push(`${field} must be at least 2 characters`);
          break;
        }
        if (typeof rule === 'function') {
          const err = rule(value);
          if (err) errors.push(err);
        }
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    next();
  };
}

module.exports = { validate };
