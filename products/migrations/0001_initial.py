# Generated by Django 5.0.1 on 2025-02-14 14:35

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('category', models.CharField(choices=[('Fruits', 'Fruits'), ('Vegetables', 'Vegetables'), ('Spices', 'Spices'), ('Herbs', 'Herbs'), ('Honey', 'Honey'), ('Roots & Tubers', 'Roots & Tubers'), ('Grains', 'Grains')], max_length=50)),
                ('description', models.TextField()),
                ('image', models.ImageField(upload_to='product_images/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('vendor', models.ForeignKey(limit_choices_to={'role': 'vendor'}, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
