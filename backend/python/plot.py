import pandas as pd
import json

data = {
    "x": [1,2,3],
    "y": [10,20,30]
}

df = pd.DataFrame(data)

result = {
    "rows": df.to_dict(orient="records")
}

print(json.dumps(result))