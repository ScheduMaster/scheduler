using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Application.Data.Entities;
using System.Text.Json.Serialization;
using Application.Helper;

namespace Application.Models.Requests
{
    public class GetNotificationModel
    {
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }

        [JsonPropertyName("IsRead")]
        [JsonConverter(typeof(StringToBooleanConverter))]
        public bool? IsRead { get; set; }
    }
}