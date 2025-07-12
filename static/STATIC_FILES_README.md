# Static Files Structure



## Folder Structure

```
static/
├── css/
│   └── global.css          # Global styles for the entire project
├── js/
│   └── utils.js           # Global JavaScript utilities
└── images/                # Global images

ReWear/static/ReWear/
├── css/
│   └── style.css          # ReWear app-specific styles
├── js/
│   └── main.js           # ReWear app-specific JavaScript
└── images/               # ReWear app-specific images
```

## How to Use Static Files in Templates

### 1. Load the static tag at the top of your template:
```html
{% load static %}
```

### 2. Include CSS files:
```html
<link rel="stylesheet" type="text/css" href="{% static 'css/global.css' %}">
<link rel="stylesheet" type="text/css" href="{% static 'ReWear/css/style.css' %}">
```

### 3. Include JavaScript files:
```html
<script src="{% static 'js/utils.js' %}"></script>
<script src="{% static 'ReWear/js/main.js' %}"></script>
```

### 4. Include images:
```html
<img src="{% static 'images/logo.png' %}" alt="Logo">
<img src="{% static 'ReWear/images/product.jpg' %}" alt="Product">
```

## Example Template Structure

```html
<!DOCTYPE html>
{% load static %}
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ReWear</title>
    
    <!-- Global CSS -->
    <link rel="stylesheet" type="text/css" href="{% static 'css/global.css' %}">
    
    <!-- App-specific CSS -->
    <link rel="stylesheet" type="text/css" href="{% static 'ReWear/css/style.css' %}">
</head>
<body>
    <!-- Your content here -->
    
    <!-- Global JavaScript -->
    <script src="{% static 'js/utils.js' %}"></script>
    
    <!-- App-specific JavaScript -->
    <script src="{% static 'ReWear/js/main.js' %}"></script>
</body>
</html>
```

## Important Notes

1. **Development vs Production**: In development, Django serves static files automatically. In production, you'll need to run `python manage.py collectstatic` to collect all static files.

2. **STATICFILES_DIRS**: The global `static/` folder is configured in `STATICFILES_DIRS` in settings.py.

3. **App-specific static files**: Files in `ReWear/static/ReWear/` are automatically discovered by Django.

4. **Naming convention**: Always create a subfolder with your app name inside the app's static folder to avoid conflicts.

## Commands

### Collect static files for production:
```bash
python manage.py collectstatic
```

### Find static files (for debugging):
```bash
python manage.py findstatic filename.css
```
