# 🧪 Survey Testing Guide

## Quick Start Testing

### 🚀 **Start the Development Server**

```bash
cd /Users/joshuapowder/Git_Local_Projects/RATE_TOBAGO
npm run dev
```

Visit: **http://localhost:3000**

---

## ✅ **Test Scenarios**

### **Test 1: Verify Required Field Validation Works**

**Purpose**: Ensure users cannot skip required fields

**Steps**:
1. Navigate to http://localhost:3000/survey
2. On Step 1, leave "Country of Residence" empty
3. Click "Next →" button
4. **✅ PASS**: Red error banner appears saying "Please fill in all required fields correctly before proceeding"
5. **✅ PASS**: Cannot proceed to Step 2
6. Fill in "Country of Residence" with "United States"
7. Click "Next →" button
8. **✅ PASS**: Proceeds to Step 2

---

### **Test 2: Verify Text Field Minimum Length**

**Purpose**: Ensure text fields validate minimum character requirements

**Steps**:
1. Complete Steps 1-3
2. On Step 4, enter only "Good" in "Overall Experience" field
3. Click "Next →" button
4. **✅ PASS**: Error shows below field: "Please share more about your experience (at least 10 characters)"
5. **✅ PASS**: Red error banner appears
6. Update text to "Good experience visiting Tobago!"
7. Click "Next →" button
8. **✅ PASS**: Proceeds to Step 5

---

### **Test 3: Verify Email Validation**

**Purpose**: Ensure email validation works for promotional opt-in

**Steps**:
1. Complete Steps 1-5
2. On Step 6, enter "not-an-email" in promotional email field
3. Click "Submit Survey" button
4. **✅ PASS**: Error shows "Please enter a valid email"
5. Clear the email field (leave empty)
6. Click "Submit Survey" button
7. **✅ PASS**: Survey submits successfully (email is optional)
8. OR enter "visitor@email.com"
9. Click "Submit Survey" button
10. **✅ PASS**: Survey submits successfully

---

### **Test 4: Complete Survey Submission & Database Verification**

**Purpose**: Verify data saves to database correctly

**Steps**:
1. Fill out a complete survey with these test values:

**Step 1: Demographics**
- Group size: `4`
- Cruise vessel: `Caribbean Dream`
- Country: `Canada`
- Gender: `Female`
- Age group: `31-40`

**Step 2: Visit Details**
- First visit: `Yes`
- Spending TT$: `5000`
- Spending US$: `750`
- Port satisfaction: `Very satisfied`

**Step 3: Attractions**
- Select: `Pigeon Point Beach` → Rate: `Excellent`
- Select: `Nylon Pool` → Rate: `Excellent`
- Select: `Buccoo Reef` → Rate: `Very Good`

**Step 4: Experience**
- Service level: `Excellent`
- Overall experience: `Amazing beaches, wonderful people, delicious food. We loved every moment!`
- Improvements: `More parking at popular beaches`
- Highlight: `Snorkeling at Buccoo Reef was unforgettable`

**Step 5: Transportation**
- Used tour: `Yes, a guided tour`
- Rating: `Excellent`
- Visit again: `Definitely`

**Step 6: Final**
- Additional feedback: `Thank you for the warm welcome!`
- Email: `test@example.com`

2. Click "Submit Survey"
3. **✅ PASS**: Redirects to `/thank-you` page
4. **✅ PASS**: See confetti animation

---

### **Test 5: Verify Database Entry**

**Option A: Using Prisma Studio (Recommended)**

```bash
# Open new terminal
cd /Users/joshuapowder/Git_Local_Projects/RATE_TOBAGO
npx prisma studio
```

Then:
1. Click on `survey_responses` table
2. **✅ PASS**: See your test entry with all fields populated
3. Click on `attraction_visits` table
4. **✅ PASS**: See 3 entries (Pigeon Point, Nylon Pool, Buccoo Reef)
5. Click on `tourist_attractions` table
6. **✅ PASS**: See the attractions listed

**Option B: Using Neon Console**

1. Go to https://console.neon.tech
2. Select your project
3. Go to "SQL Editor"
4. Run this query:

```sql
-- Get latest survey
SELECT * FROM survey_responses 
ORDER BY created_at DESC 
LIMIT 1;

-- Get attraction visits for latest survey
SELECT 
  sv.*,
  ta.name as attraction_name,
  av.rating
FROM survey_responses sv
LEFT JOIN attraction_visits av ON sv.id = av.survey_response_id
LEFT JOIN tourist_attractions ta ON av.tourist_attraction_id = ta.id
ORDER BY sv.created_at DESC
LIMIT 10;
```

5. **✅ PASS**: See your test data with all fields correctly saved

---

### **Test 6: Verify Console Logging**

**Purpose**: Ensure debugging logs work correctly

**Steps**:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Submit a survey
4. **✅ PASS**: See frontend logs:
   ```
   Submitting survey data: {...}
   Survey submission result: {success: true, ...}
   ```

5. Check terminal where `npm run dev` is running
6. **✅ PASS**: See backend logs:
   ```
   Received survey data: {...}
   Validation successful
   Survey response created with ID: xxx
   Creating 3 attraction visits
   All attraction visits created successfully
   Survey submission completed successfully
   ```

---

## 🎯 **Expected Behavior Summary**

### ✅ **What Should Work:**

1. **Required fields cannot be bypassed**
   - Must fill in before clicking "Next"
   - Clear error messages when validation fails

2. **Text fields enforce minimum length**
   - "Overall Experience" requires 10+ characters
   - Error shown if too short

3. **Email validation**
   - Must be valid email format if provided
   - Optional field (can be left empty)

4. **Data saves to database**
   - All fields map correctly to database columns
   - Attraction visits create proper relationships
   - No data loss

5. **Error handling**
   - Validation errors show specific messages
   - Database errors logged to console
   - User-friendly error messages

6. **Navigation**
   - Can go back without losing data
   - Validation only blocks forward movement
   - Progress bar shows current step

---

## 🐛 **What to Look For (Red Flags)**

### ❌ **Problems to Report:**

1. **Can skip required fields by clicking "Next"**
   - Should NOT be possible anymore

2. **No error message when validation fails**
   - Should show red banner + field errors

3. **Data not saving to database**
   - Check Prisma Studio or Neon Console
   - Should see entry after submission

4. **Error messages not clear**
   - Should explain what's wrong
   - Should guide user to fix it

5. **Form loses data when going back**
   - All entered data should persist

---

## 📊 **Validation Rules Reference**

### Required Fields (Cannot Skip):

**Step 1:**
- ✅ Group size (number 1-100)
- ✅ Country of residence (min 2 chars)
- ✅ Gender (select one)
- ✅ Age group (select one)

**Step 2:**
- ✅ First visit (yes/no)
- ✅ Port satisfaction (select one)

**Step 3:**
- None (attractions optional)

**Step 4:**
- ✅ Customer service level (select one)
- ✅ Overall experience (min 10 chars)

**Step 5:**
- ✅ Used guided tour (select one)
- ✅ Would visit again (select one)

**Step 6:**
- None (all optional)

### Optional Fields:

- Cruise vessel name
- Spending amounts (TT$ and US$)
- Attraction visits
- Improvement suggestions
- Visit highlight
- Transportation rating (only if used)
- Additional feedback
- Promotional email

---

## 🎓 **Quick Database Queries**

### View All Responses:
```sql
SELECT 
  id,
  country_of_residence,
  created_at,
  overall_experience
FROM survey_responses
ORDER BY created_at DESC;
```

### Count Responses by Country:
```sql
SELECT 
  country_of_residence,
  COUNT(*) as response_count
FROM survey_responses
GROUP BY country_of_residence
ORDER BY response_count DESC;
```

### Popular Attractions:
```sql
SELECT 
  ta.name,
  COUNT(*) as visit_count,
  AVG(CASE 
    WHEN av.rating = 'Excellent' THEN 5
    WHEN av.rating = 'Very Good' THEN 4
    WHEN av.rating = 'Good' THEN 3
    WHEN av.rating = 'Fair' THEN 2
    WHEN av.rating = 'Poor' THEN 1
  END) as avg_rating
FROM tourist_attractions ta
JOIN attraction_visits av ON ta.id = av.tourist_attraction_id
GROUP BY ta.name
ORDER BY visit_count DESC;
```

### Recent Feedback:
```sql
SELECT 
  country_of_residence,
  overall_experience,
  visit_highlight,
  created_at
FROM survey_responses
WHERE created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

---

## 🚀 **Production Testing (After Vercel Deployment)**

1. Visit your deployed URL (e.g., https://rate-tobago.vercel.app)
2. Run all test scenarios above
3. Verify database entries in Neon Console
4. Check Vercel logs for any errors
5. Test on mobile devices
6. Test on different browsers

---

## ✅ **Testing Checklist**

- [ ] Required field validation works
- [ ] Text field minimum length enforced
- [ ] Email validation works
- [ ] Complete survey submits successfully
- [ ] Database entry created correctly
- [ ] Attraction visits saved with relationships
- [ ] Console logs show in browser
- [ ] Terminal logs show backend operations
- [ ] Error messages are clear and helpful
- [ ] Can go back without losing data
- [ ] Progress bar updates correctly
- [ ] Thank you page appears after submission
- [ ] All optional fields work when empty
- [ ] All optional fields work when filled

---

## 📞 **Need Help?**

If you encounter issues:

1. **Check browser console** (F12 → Console tab)
2. **Check terminal logs** where `npm run dev` is running
3. **Check Neon Console** for database connection
4. **Read error messages** carefully - they now provide details

---

**Status**: ✅ All validation and database issues fixed!  
**Build**: ✅ Passing  
**Database**: ✅ Connected and operational  
**Ready for testing**: ✅ YES

