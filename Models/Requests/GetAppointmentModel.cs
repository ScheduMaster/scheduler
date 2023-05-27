using System.Text.Json.Serialization;
using Application.Helper;


namespace Application.Models.Requests
{
    public class GetAppointmentModel
    {
        [JsonPropertyName("All")]
        [JsonConverter(typeof(StringToBooleanConverter))]
        public bool? All { get; set; }

        [JsonPropertyName("Own")]
        [JsonConverter(typeof(StringToBooleanConverter))]
        public bool? Own { get; set; }
    }
}