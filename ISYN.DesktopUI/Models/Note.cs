using System;
using System.Collections.Generic;
using System.Text;

namespace ISYN.DesktopUI.Models
{
    public class Note
    {
        public string Id { get; set; }
        public string Content { get; set; }
        public int Rank { get; set; }
        public double Score { get; set; }
    }
}
