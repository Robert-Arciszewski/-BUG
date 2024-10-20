users = [
    {"name": "Kamil", "country": "Poland"},
    {"name": "John", "country": "USA"},
    {"name": "Yeti"}
]


polish_users = [user for user in users if user.get("country") == "Poland"]

print("Users from Poland:")
for user in polish_users:
    print(user)
