# Seed Script Usage Guide

## Kya Karta Hai?

Yeh script **Database Reset & Seed** karta hai:

1. **Drop Tables**: Purana data delete karta hai.
2. **Recreate Tables**: Fresh tables banata hai.
3. **Seed Data**:
   - **20 Users** (different ages, genders)
   - **150 Feature Clicks** (last 30 days data)

## Kaise Chalaye?

### Step 1: Virtual Environment Activate Karo

```bash
cd backend
myenv\Scripts\Activate
```

### Step 2: Seed Script Run Karo

```bash
python seed.py
```

### Step 3: Server Restart Karo (Zaroori Hai!)

Kyunki database tables recreate hue hain, server ko restart karna padta hai naya connection lene ke liye.

```bash
python main.py
```

## Data Summary

- **Users Created**: 20
- **Username Pattern**: `alice_smith`, `bob_jones`, etc.
- **Password**: `password123` (sabka same)
- **Clicks**: 150 feature interactions

## Login Access

Use any of these users to login:

- **Username**: `alice_smith`
- **Password**: `password123`

## Testing Analytics

Postman ya Browser mein check karein:

- **URL**: `GET http://localhost:9000/track/analytics`
- **Params**: `start_date=2026-01-01`, `end_date=2026-01-30`

Happy Coding! 🚀
