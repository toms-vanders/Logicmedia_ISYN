using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using ISYN.DataAccess.Models;
using Newtonsoft.Json;

namespace ISYN.DesktopUI
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly HttpClient _httpClient;

        public MainWindow()
        {
            InitializeComponent();

            _httpClient = new HttpClient()
            {
                BaseAddress = new Uri("https://localhost:44371/")
            };

            GetAllNotes();
        }
        
        private void searchButton_Click(object sender, RoutedEventArgs e)
        {

        }

        public async void GetAllNotes()
        {
            string responseBody = await _httpClient.GetStringAsync("api/note");

            var notes = JsonConvert.DeserializeObject<IEnumerable<string>>(responseBody);

            searchResults.ItemsSource = notes;



        }
    }
}
