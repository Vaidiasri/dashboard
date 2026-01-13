---
description: Keep code simple and easy - complexity 4 se zyada nahi
---

# Keep It Simple (KISS) Workflow

**Mission**: Complex cheezein ko EASY banana hai, code ko complex nahi!

---

## Core Principles

### 🎯 Rule #1: Complexity Rating <= 4

- Har change ka complexity **maximum 4** hona chahiye
- Agar 4 se zyada lag raha hai, toh **break it down** karo

### 🎯 Rule #2: Easy to Understand

- Code padh ke **turant samajh aana chahiye**
- Comments zyada likhne ki zaroorat nahi padni chahiye
- Variable/function names **self-explanatory** hone chahiye

### 🎯 Rule #3: Avoid Over-Engineering

- **Sirf wohi add karo jo ABHI chahiye**
- Future-proofing ke chakkar mein complex mat banao
- YAGNI principle: "You Ain't Gonna Need It"

---

## Before Making Changes - Self Check

### ❌ Don't Do This:

- Multiple design patterns ek saath use karna
- 10+ lines ke one-liners
- Nested ternary operators
- Over-abstraction (har cheez ke liye class/interface)
- Premature optimization
- Too many relationships/constraints ek saath add karna

### ✅ Do This Instead:

- Simple, straightforward code
- One thing at a time
- Clear variable names
- Small functions (max 10-15 lines)
- Step-by-step approach
- Ek feature, ek commit

---

## Simplicity Checklist

Before committing code, check:

- [ ] Kya ek junior developer yeh code samajh sakta hai?
- [ ] Kya main 6 mahine baad yeh code samajh paunga?
- [ ] Kya yeh code **minimum lines** mein likha ja sakta hai?
- [ ] Kya har function **ek hi kaam** kar raha hai?
- [ ] Kya variable names **meaningful** hain?
- [ ] Kya comments **zaroorat** se zyada toh nahi hain?

---

## Code Review Questions

### For Every Change Ask:

1. **Kya yeh simple hai?**

   - Agar nahi, toh kaise simple kar sakte hain?

2. **Kya yeh zaruri hai?**

   - Agar nahi, toh remove karo

3. **Kya yeh readable hai?**

   - Agar nahi, toh refactor karo

4. **Kya yeh testable hai?**
   - Agar nahi, toh break down karo

---

## Examples

### ❌ Complex (Avoid):

```python
# Too many things at once
class User(Base):
    # 20+ fields
    # 5+ relationships
    # 10+ constraints
    # Custom validators
    # Event listeners
    # Hybrid properties
    pass
```

### ✅ Simple (Prefer):

```python
# Start basic, add gradually
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True)
    password = Column(String(255))

    # Add more as needed, one at a time
```

---

### ❌ Complex Function:

```python
def process_data(data):
    return [{'result': sum([int(x) for x in item.split(',') if x.isdigit()]) / len([x for x in item.split(',') if x.isdigit()]) if len([x for x in item.split(',') if x.isdigit()]) > 0 else 0} for item in data]
```

### ✅ Simple Function:

```python
def process_data(data):
    results = []
    for item in data:
        numbers = [int(x) for x in item.split(',') if x.isdigit()]
        average = sum(numbers) / len(numbers) if numbers else 0
        results.append({'result': average})
    return results
```

---

## When Adding Features

### Step-by-Step Approach:

1. **Start Minimal**

   - Sirf basic functionality add karo
   - Test karo ki kaam kar raha hai

2. **Add One Thing**

   - Ek feature add karo
   - Test karo

3. **Repeat**
   - Dheere dheere build karo
   - Har step par test karo

### ❌ Don't:

```python
# Adding everything at once
- Add 5 fields
- Add 3 relationships
- Add 10 constraints
- Add validation
- Add indexes
- Add triggers
```

### ✅ Do:

```python
# Step 1: Basic fields
- Add username, password

# Step 2: Test it works

# Step 3: Add one more thing
- Add age field

# Step 4: Test again

# And so on...
```

---

## Complexity Rating Guide

### Complexity 1-2 (Simple):

- Adding/removing a field
- Renaming variables
- Simple bug fixes
- Adding comments

### Complexity 3-4 (Moderate):

- Adding a relationship
- Adding validation
- Refactoring a function
- Adding an index

### Complexity 5+ (TOO COMPLEX - AVOID):

- Multiple relationships + constraints + validation
- Complete redesign
- Adding many features at once
- Over-engineering

---

## Remember

> "Simplicity is the ultimate sophistication" - Leonardo da Vinci

> "Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler

> "KISS - Keep It Simple, Stupid!"

---

## Action Items

When reviewing code:

1. **Simplify First**

   - Pehle simple solution socho
   - Complex solution last resort hai

2. **Break It Down**

   - Agar complex lag raha hai, toh chhote pieces mein todo karo

3. **Ask "Why?"**

   - Har line ke liye pucho: "Kya yeh zaruri hai?"

4. **Refactor Ruthlessly**
   - Agar complex dikha, turant simplify karo

---

## Usage

```bash
# Har change se pehle yeh workflow yaad rakho
/keep-it-simple
```

**Golden Rule**: Agar tumhara junior developer yeh code nahi samajh sakta, toh code galat hai, developer nahi! 🎯
