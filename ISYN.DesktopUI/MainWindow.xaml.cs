using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using ISYN.DesktopUI.Models;
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
        
        private async void searchButton_Click(object sender, RoutedEventArgs e)
        {

            string content = searchBar.Text;
            string responseBody = await _httpClient.GetStringAsync("api/note/" + content);
            var notes = JsonConvert.DeserializeObject<IEnumerable<string>>(responseBody);

            searchResults.ItemsSource = notes;
        }

        public async void GetAllNotes()
        {
            string responseBody = await _httpClient.GetStringAsync("api/note");

            var notes = JsonConvert.DeserializeObject<IEnumerable<string>>(responseBody);

            searchResults.ItemsSource = notes;
        }

        private async void addNoteButton_Click(object sender, RoutedEventArgs e)
        {
            Note newNote = new Note()
            {
                Content = searchBar.Text
            };

            var response = await _httpClient.PostAsJsonAsync("api/note", newNote);

            if (response.IsSuccessStatusCode)
            {
                MessageBox.Show("Note added", "Successfully added new note!", MessageBoxButton.OK, MessageBoxImage.Information);

            }
            else
            {
                MessageBox.Show("Error", "Error Code" +
                response.StatusCode + " : Message - " + response.ReasonPhrase, MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async void addNoteSAYTButton_Click(object sender, RoutedEventArgs e)
        {
            Note newNote = new Note()
            {
                Content = saytBar.Text
            };

            var response = await _httpClient.PostAsJsonAsync("api/note", newNote);

            if (response.IsSuccessStatusCode)
            {
                MessageBox.Show("Note added", "Successfully added new note!", MessageBoxButton.OK, MessageBoxImage.Information);

            }
            else
            {
                MessageBox.Show("Error", "Error Code" +
                response.StatusCode + " : Message - " + response.ReasonPhrase, MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async void saytBar_TextChanged(object sender, System.Windows.Controls.TextChangedEventArgs e)
        {
            string content = saytBar.Text;
            string responseBody = await _httpClient.GetStringAsync("api/note/sayt/" + content);
            var notes = JsonConvert.DeserializeObject<IEnumerable<string>>(responseBody);

            searchResults.ItemsSource = notes;
        }
    }
}
