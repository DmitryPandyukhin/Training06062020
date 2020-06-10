using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using IBM.Data.Informix;

namespace ROC.Models
{
    public class Sql
    {
        public Search Select(string sqlCount, string sql)
        {
            String _connectionString =
                    "Server=ol_svr_custom;" +
                    "Host=localhost;" +
                    "Service=turbo;" +
                    "Database=registration;" +
                    "User ID=informix;" +
                    "Password=123456;" +
                    "Client Locale=ru_ru.CP1251;" +
                    "Database Locale=ru_ru.915;" +
                    "Max Pool Size=500;" +
                    "Pooling=True;" +
                    "Protocol=olsoctcp;" +
                    "Connection Lifetime=1200;" +
                    "Connection Timeout=1;";
            try
            {   
                IfxConnection _Connection = new IfxConnection()
                {
                    ConnectionString = _connectionString
                };
                _Connection.Open();
                try
                {
                    Search _Search = new Search
                    {
                        Total = "0",
                        ListCitizen = new List<Citizen>()
                    };

                    IfxCommand _command = new IfxCommand
                    {
                        Connection = _Connection,
                        CommandText = sqlCount
                    };
                    IfxDataReader _dataReader = _command.ExecuteReader();
                    while (_dataReader.Read())
                    {
                        _Search.Total = _dataReader.GetString(0);
                    }

                    _dataReader.Close();
                    _command.CommandText = sql;
                    _dataReader = _command.ExecuteReader();                    
                    while (_dataReader.Read())
                    {
                        if (!_dataReader.IsDBNull(0))
                        {
                            Citizen citizen = new Citizen();
                            citizen.Id = _dataReader.GetString(0);
                            citizen.LastName = _dataReader.GetString(1);
                            citizen.FirstName = _dataReader.GetString(2);
                            citizen.MiddleName = _dataReader.GetString(3);

                            string dt = _dataReader.GetString(4);
                            
                            if (dt.Length == 10)
                                citizen.DateOfBirth = _dataReader.GetDateTime(4).ToString("d");

                            _Search.ListCitizen.Add(citizen);
                        }
                    }

                    if (_dataReader != null)
                        _dataReader.Close();

                    if (_Connection != null)
                        _Connection.Close();

                    return _Search;
                }
                catch
                {
                    return null;
                }

            }
            catch
            {
                return null;
            }            
        }
        
        public List<Citizen> Insert(string sql)
        {
            String _connectionString =
                    "Server=ol_svr_custom;" +
                    "Host=localhost;" +
                    "Service=turbo;" +
                    "Database=registration;" +
                    "User ID=informix;" +
                    "Password=123456;" +
                    "Client Locale=ru_ru.CP1251;" +
                    "Database Locale=ru_ru.915;" +
                    "Max Pool Size=500;" +
                    "Pooling=True;" +
                    "Protocol=olsoctcp;" +
                    "Connection Lifetime=1200;" +
                    "Connection Timeout=1;";
            try
            {
                IfxConnection _Connection = new IfxConnection()
                {
                    ConnectionString = _connectionString
                };
                _Connection.Open();
                try
                {
                    IfxCommand _command = new IfxCommand
                    {
                        Connection = _Connection,
                        CommandText = sql 
                    };
                    _command.ExecuteNonQuery();

                    _command.CommandText = "select dbinfo('sqlca.sqlerrd1') from systables where tabid=1";
                    IfxDataReader _dataReader;
                    _dataReader = _command.ExecuteReader();
                    Citizen citizen = new Citizen();
                    string Id = "";
                    while (_dataReader.Read()) {
                         Id = _dataReader.GetString(0);
                    }
                    _dataReader.Close();
                    _command.CommandText = $"select * from citizens where id = {Id}";
                    _dataReader = _command.ExecuteReader();                    
                    List<Citizen> citizens = new List<Citizen> { };
                    while (_dataReader.Read())
                    {
                        if (!_dataReader.IsDBNull(0))
                        {
                            citizen = new Citizen();
                            citizen.Id = _dataReader.GetString(0);
                            citizen.LastName = _dataReader.GetString(1);
                            citizen.FirstName = _dataReader.GetString(2);
                            citizen.MiddleName = _dataReader.GetString(3);

                            string dt = _dataReader.GetString(4);
                            if (dt.Length == 10)
                                citizen.DateOfBirth = _dataReader.GetDateTime(4).ToString("d");

                            citizens.Add(citizen);
                        }
                    }

                    if (_dataReader != null)
                        _dataReader.Close();

                    if (_Connection != null)
                        _Connection.Close();

                    if (citizens.Count > 0)
                        return citizens;
                    else
                        return null;
                }
                catch
                {
                    return null;
                }

            }
            catch
            {
                return null;
            }
        }

        
        public List<Citizen> Update(string id, string sql)
        {
            String _connectionString =
                    "Server=ol_svr_custom;" +
                    "Host=localhost;" +
                    "Service=turbo;" +
                    "Database=registration;" +
                    "User ID=informix;" +
                    "Password=123456;" +
                    "Client Locale=ru_ru.CP1251;" +
                    "Database Locale=ru_ru.915;" +
                    "Max Pool Size=500;" +
                    "Pooling=True;" +
                    "Protocol=olsoctcp;" +
                    "Connection Lifetime=1200;" +
                    "Connection Timeout=1;";
            try
            {
                IfxConnection _Connection = new IfxConnection()
                {
                    ConnectionString = _connectionString
                };
                _Connection.Open();
                try
                {
                    IfxCommand _command = new IfxCommand
                    {
                        Connection = _Connection,
                        CommandText = sql
                    };
                    _command.ExecuteNonQuery();

                    _command.CommandText = $"select * from citizens where id = {id}";
                    IfxDataReader _dataReader;
                    _dataReader = _command.ExecuteReader();
                    Citizen citizen = new Citizen();
                    string Id = "";
                    while (_dataReader.Read())
                    {
                        Id = _dataReader.GetString(0);
                    }
                    _dataReader.Close();
                    _command.CommandText = $"select * from citizens where id = {Id}";
                    _dataReader = _command.ExecuteReader();
                    List<Citizen> citizens = new List<Citizen> { };
                    while (_dataReader.Read())
                    {
                        if (!_dataReader.IsDBNull(0))
                        {
                            citizen = new Citizen();
                            citizen.Id = _dataReader.GetString(0);
                            citizen.LastName = _dataReader.GetString(1);
                            citizen.FirstName = _dataReader.GetString(2);
                            citizen.MiddleName = _dataReader.GetString(3);

                            string dt = _dataReader.GetString(4);
                            if (dt.Length == 10)
                                citizen.DateOfBirth = _dataReader.GetDateTime(4).ToString("d");

                            citizens.Add(citizen);
                        }
                    }

                    if (_dataReader != null)
                        _dataReader.Close();

                    if (_Connection != null)
                        _Connection.Close();

                    if (citizens.Count > 0)
                        return citizens;
                    else
                        return null;
                }
                catch
                {
                    return null;
                }

            }
            catch
            {
                return null;
            }
        }

        public bool Delete(string sql)
        {
            String _connectionString =
                    "Server=ol_svr_custom;" +
                    "Host=localhost;" +
                    "Service=turbo;" +
                    "Database=registration;" +
                    "User ID=informix;" +
                    "Password=123456;" +
                    "Client Locale=ru_ru.CP1251;" +
                    "Database Locale=ru_ru.915;" +
                    "Max Pool Size=500;" +
                    "Pooling=True;" +
                    "Protocol=olsoctcp;" +
                    "Connection Lifetime=1200;" +
                    "Connection Timeout=1;";
            try
            {
                IfxConnection _Connection = new IfxConnection()
                {
                    ConnectionString = _connectionString
                };
                _Connection.Open();
                try
                {
                    IfxCommand _command = new IfxCommand
                    {
                        Connection = _Connection,
                        CommandText = sql
                    };
                    _command.ExecuteNonQuery();

                    if (_Connection != null)
                        _Connection.Close();

                    return true;
                }
                catch
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }
    }
}