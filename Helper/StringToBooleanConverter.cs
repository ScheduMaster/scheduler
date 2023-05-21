using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Application.Helper
{
    public class StringToBooleanConverter : JsonConverter<bool>
    {
        public override bool Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.True || reader.TokenType == JsonTokenType.False)
            {
                return reader.GetBoolean();
            }

            if (reader.TokenType == JsonTokenType.String && bool.TryParse(reader.GetString(), out bool boolValue))
            {
                return boolValue;
            }

            return default;
        }

        public override void Write(Utf8JsonWriter writer, bool value, JsonSerializerOptions options)
        {
            writer.WriteBooleanValue(value);
        }
    }
}
